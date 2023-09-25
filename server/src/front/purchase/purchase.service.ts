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
import { TossPaymentApproveReqDto } from "./dto/toss-payment.dto";
import { HttpService } from "../http/http.service";
import { Payment } from "../../entities/payment.entity";

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
      title: purchase.title,
      totalPrice: purchase.totalPrice,
      orderId: purchase.order_code,
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

  // 토스 페이 결제 승인
  async tossPaymentApprove(body: TossPaymentApproveReqDto, user: User) {
    const purchase = user.purchases.find((item) => item.order_code === body.orderCode);

    if (isNil(purchase)) {
      throw new BadRequestException(errorMessage.BAD_REQUEST);
    }

    const isAllWaiting = purchase.purchase_items
      .map((item) => item.status)
      .every((item) => item === PurchaseItemStatus.WAITING);
    if (!isAllWaiting) {
      throw new BadRequestException(errorMessage.ALREADY_PAID);
    }

    if (body.amount !== purchase.totalPrice) {
      throw new BadRequestException(errorMessage.NOT_EQUAL_PRICE);
    }

    const base64SecretKey = Buffer.from(`${this.tossSecretKey}:`).toString("base64");

    try {
      const payment = new Payment();
      payment.purchase = purchase;
      await payment.save();

      // const tossPayment = new TossPayment();
      //
      // tossPayment.code = res.code;
      // tossPayment.checkout_page = res?.checkoutPage ?? "";
      // tossPayment.pay_token = res?.payToken ?? "";
      // tossPayment.msg = res.msg;
      // tossPayment.error_code = res.errorCode;
      // tossPayment.payment = payment;

      // await tossPayment.save();
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    // if (res.code !== 0 || isBlank(res.checkoutPage)) {
    //   throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    // }

    return { checkoutPage: "" };
  }

  async tossPayCallback(body) {}
}
