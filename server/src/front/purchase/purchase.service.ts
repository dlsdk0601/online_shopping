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
import {
  TossPaymentApproveReqDto,
  TossPaymentHttpApproveReqDto,
  TossPaymentHttpApproveResDto,
} from "./dto/toss-payment.dto";
import { HttpService } from "../http/http.service";
import { Payment } from "../../entities/payment.entity";

@Injectable()
export class PurchaseService {
  private readonly tossClientKey: string;
  private readonly tossSecretKey: string;
  private readonly tossPaymentApproveUrl = "https://api.tosspayments.com/v1/payments/confirm";

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

    // 상품 결제 상태가 하나라도 waiting 이 아니면 막는다.
    const isAllWaiting = purchase.purchase_items
      .map((item) => item.status)
      .every((item) => item === PurchaseItemStatus.WAITING);
    if (!isAllWaiting) {
      throw new BadRequestException(errorMessage.ALREADY_PAID);
    }

    // 가격이 서로 맞지 않으면 막는다.
    if (body.amount !== purchase.totalPrice) {
      throw new BadRequestException(errorMessage.NOT_EQUAL_PRICE);
    }

    const base64SecretKey = Buffer.from(`${this.tossSecretKey}:`).toString("base64");

    try {
      const payment = new Payment();
      payment.purchase = purchase;
      payment.payment_key = body.paymentKey;
      payment.payment_type = body.paymentType;
      await payment.save();
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    const res = await this.httpService.post<
      TossPaymentHttpApproveResDto,
      TossPaymentHttpApproveReqDto
    >(
      this.tossPaymentApproveUrl,
      {
        headers: {
          "Authorization": `Basic ${base64SecretKey}`,
          "Content-Type": "application/json",
        },
      },
      {
        paymentKey: body.paymentKey,
        orderId: body.orderCode,
        amount: body.amount,
      }
    );

    console.log("요기");
    console.log(res);

    // 서버 통신 실패
    if (isNil(res)) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    // 결제 실패
    // TODO :: 결제 실패 로직 추가
    if (isNotNil(res.failure)) {
      throw new InternalServerErrorException(res.failure.message);
    }

    // TODO :: 카드, 무통장입금, 간편결제 테이블 만들어 지면 성공 후 저장 로직 추가
    return { result: true };
  }
}
