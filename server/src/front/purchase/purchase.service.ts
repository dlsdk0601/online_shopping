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
import { isNotNil, makeOrderCode } from "../../ex/ex";
import { User } from "../../entities/user.entity";
import { PurchaseItemStatus } from "../../type/commonType";
import { CartProduct } from "../../entities/cart.entity";
import { AddTossPayPurchaseReqDto, makeTossPayPurchaseResDto } from "./dto/toss-payment.dto";
import { HttpService } from "../http/http.service";

@Injectable()
export class PurchaseService {
  private readonly tossClientKey: string;
  private readonly tossSecretKey: string;
  private readonly addTossPayPurchaseEndPoint = "https://pay.toss.im/api/v2/payments";

  constructor(
    private assetService: AssetService,
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.tossClientKey = this.configService.get<string>("TOSS_PAYMENT_CLIENT_API_KEY") ?? "";
    this.tossSecretKey = this.configService.get<string>("TOSS_PAYMENT_SECRET_KEY") ?? "";
  }

  async show(pk: number) {
    const purchase = await Purchase.findOne({
      where: { pk },
    });

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
      const res = await this.httpService.post<makeTossPayPurchaseResDto>(
        this.addTossPayPurchaseEndPoint,
        {},
        {
          orderNo: purchase.order_code,
          amount: body.amount,
          amountTaxFree: 0,
          productDesc: body.productDesc,
          apiKey: this.configService.get<string>("TOSS_PAYMENT_CLIENT_API_KEY") ?? "",
          autoExecute: true,
          resultCallback: "",
          retUrl: "",
          retCancelUrl: "",
        }
      );

      console.log("요기");
      console.log(res);

      if (isNil(res)) {
        return new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
      }

      return { checkoutPage: "" };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
