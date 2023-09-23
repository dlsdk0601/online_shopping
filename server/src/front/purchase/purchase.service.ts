import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isNil } from "lodash";
import { In } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { AssetService } from "../../asset/asset.service";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import errorMessage from "../../config/errorMessage";
import { AddPurchaseReqDto } from "./dto/add-purchase.dto";
import { isBlank, isNotNil, makeOrderCode } from "../../ex/ex";
import { User } from "../../entities/user.entity";
import { PaymentType, PurchaseItemStatus } from "../../type/commonType";
import { CartProduct } from "../../entities/cart.entity";
import {
  AddTossPayPurchaseReqDto,
  makeTossPayPurchaseReqDto,
  makeTossPayPurchaseResDto,
} from "./dto/toss-payment.dto";
import { HttpService } from "../http/http.service";
import { Payment, TossPayment } from "../../entities/payment.entity";

@Injectable()
export class PurchaseService {
  private readonly tossClientKey: string;
  private readonly tossSecretKey: string;
  private readonly addTossPayPurchaseEndPoint = "https://pay.toss.im/api/v2/payments";
  private readonly TOSS_CALLBACK_VERSION = "V2";

  constructor(
    private assetService: AssetService,
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.tossClientKey = this.configService.get<string>("TOSS_PAYMENT_CLIENT_API_KEY") ?? "";
    this.tossSecretKey = this.configService.get<string>("TOSS_PAYMENT_SECRET_KEY") ?? "";
  }

  show(pk: number, user: User) {
    const purchase = user.purchases.find((item) => item.pk === pk);

    if (isNil(purchase)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: purchase.pk,
      list: purchase.purchase_items.map((item) => ({
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        image: this.assetService.getFileSet(item.product.main_image),
      })),
      totalPrice: purchase.totalPrice,
    };
  }

  async add(body: AddPurchaseReqDto, user: User) {
    const purchase = new Purchase();
    purchase.order_code = makeOrderCode();
    purchase.user = user;

    const cartProducts: CartProduct[] = await CartProduct.find({
      where: {
        pk: In(body.pks),
      },
    });

    const purchaseItems: PurchaseItem[] = [];

    for (let i = 0; i < body.pks.length; i++) {
      const purchaseItem = new PurchaseItem();
      purchaseItem.status = PurchaseItemStatus.WAITING;

      const cartProduct = cartProducts.find((item) => item.pk === body.pks[i]);
      if (isNotNil(cartProduct)) {
        purchaseItem.product = cartProduct.product;
        purchaseItem.count = cartProduct.count;
      }

      purchaseItems.push(purchaseItem);
    }

    purchase.purchase_items = purchaseItems;

    try {
      await purchase.save();
      return { pk: purchase.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  // 토스 페이 결제 생성
  async addTossPayPurchase(body: AddTossPayPurchaseReqDto, user: User) {
    const purchase = user.purchases.find((item) => item.pk === body.pk);

    if (isNil(purchase)) {
      throw new BadRequestException(errorMessage.BAD_REQUEST);
    }

    try {
      const secretKey = this.configService.get<string>("TOSS_PAYMENT_SECRET_KEY") ?? "";
      const base64SecretKey = Buffer.from(`${secretKey}:`).toString("base64");

      const res = await this.httpService.post<makeTossPayPurchaseResDto, makeTossPayPurchaseReqDto>(
        this.addTossPayPurchaseEndPoint,
        {
          headers: {
            Authorization: `Basic ${base64SecretKey}`,
          },
        },
        {
          orderNo: purchase.order_code,
          amount: purchase.totalPrice,
          amountTaxFree: 0,
          productDesc: body.productDesc,
          apiKey: this.configService.get<string>("TOSS_PAYMENT_CLIENT_API_KEY") ?? "",
          autoExecute: true,
          callbackVersion: this.TOSS_CALLBACK_VERSION,
          resultCallback: this.configService.get<string>("TOSS_PAYMENT_CALLBACK_URL") ?? "",
          retUrl: this.configService.get<string>("TOSS_PAYMENT_RESULT_URL") ?? "",
          retCancelUrl: this.configService.get<string>("TOSS_PAYMENT_FAIL_URL") ?? "",
        }
      );

      if (isNil(res)) {
        return new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
      }

      const payment = new Payment();
      payment.purchase = purchase;
      payment.type = PaymentType.TOSS;
      await payment.save();

      const tossPayment = new TossPayment();

      tossPayment.code = res.code;
      tossPayment.checkout_page = res?.checkoutPage ?? "";
      tossPayment.pay_token = res?.payToken ?? "";
      tossPayment.msg = res.msg;
      tossPayment.error_code = res.errorCode;
      tossPayment.payment = payment;

      await tossPayment.save();

      if (res.code !== 0 || isBlank(res.checkoutPage)) {
        return new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
      }

      return { checkoutPage: res.checkoutPage };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
