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
import {
  TossPaymentApprove,
  TossPaymentApproveCard,
  TossPaymentFailure,
  TossPaymentVirtualAccount,
} from "../../entities/payment-approve.entity";
import {
  TossPaymentCardDto,
  TossPaymentErrorDto,
  TossPaymentVirtualAccountDto,
} from "./dto/common.dto";

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

    const payment = await this.savePayment(body, purchase);

    const base64SecretKey = Buffer.from(`${this.tossSecretKey}:`).toString("base64");
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

    const approve = await this.saveApprove(res, payment);

    // 결제 실패
    if (isNotNil(res.failure)) {
      await this.saveFailure(res.failure, approve);
      return { result: false };
    }

    // 카드 결제
    if (isNotNil(res.card)) {
      await this.saveCard(res.card, approve);
      return { result: true };
    }

    // 무통장 입금
    if (isNotNil(res.virtualAccount)) {
    }

    // TODO :: 카드, 무통장입금, 간편결제 테이블 만들어 지면 성공 후 저장 로직 추가
    return { result: true };
  }

  async savePayment(body: TossPaymentApproveReqDto, purchase: Purchase): Promise<Payment> {
    const payment = new Payment();
    payment.purchase = purchase;
    payment.payment_key = body.paymentKey;
    payment.payment_type = body.paymentType;

    try {
      await payment.save();
      return payment;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async saveApprove(
    res: TossPaymentHttpApproveResDto,
    payment: Payment
  ): Promise<TossPaymentApprove> {
    const approve = new TossPaymentApprove();
    approve.payment = payment;
    approve.mid = res.mId;
    approve.version = res.version;
    approve.payment_key = res.paymentKey;
    approve.status = res.status;
    approve.last_transaction_key = res.lastTransactionKey ?? "";
    approve.order_id = res.orderId;
    approve.order_name = res.orderName;
    approve.requested_at = res.requestedAt;
    approve.approvedAt = res.approvedAt;
    approve.use_escrow = res.useEscrow;
    approve.culture_expense = res.cultureExpense;
    approve.discount = res.discount?.amount ?? null;
    approve.secret = res.secret ?? "";
    approve.type = res.type;
    approve.country = res.country;
    approve.is_partial_cancelable = res.isPartialCancelable;
    approve.receipt = res.receipt.url;
    approve.checkout = res.checkout.url;
    approve.currency = res.currency;
    approve.total_amount = res.totalAmount;
    approve.balance_amount = res.balanceAmount;
    approve.supplied_amount = res.suppliedAmount;
    approve.vat = res.vat;
    approve.tax_free_amount = res.taxFreeAmount;
    approve.method = res.method;

    try {
      await approve.save();
      return approve;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async saveFailure(
    err: TossPaymentErrorDto,
    approve: TossPaymentApprove
  ): Promise<TossPaymentFailure> {
    const fail = new TossPaymentFailure();
    fail.approve = approve;
    fail.code = err.code;
    fail.message = err.message;

    try {
      await fail.save();
      return fail;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async saveCard(
    card: TossPaymentCardDto,
    approve: TossPaymentApprove
  ): Promise<TossPaymentApproveCard> {
    const cardApprove = new TossPaymentApproveCard();
    cardApprove.approve = approve;
    cardApprove.amount = card.amount;
    cardApprove.issuer_code = card.issuerCode;
    cardApprove.acquirer_code = card.acquirerCode ?? "";
    cardApprove.number = card.number;
    cardApprove.installment_plan_months = card.installmentPlanMonths;
    cardApprove.approve_no = card.approveNo;
    cardApprove.use_card_point = card.useCardPoint;
    cardApprove.card_type = card.cardType;
    cardApprove.owner_type = card.ownerType;
    cardApprove.acquire_status = card.acquireStatus;
    cardApprove.is_interest_free = card.isInterestFree;
    cardApprove.interest_payer = card.interestPayer ?? "";

    try {
      await cardApprove.save();
      return cardApprove;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async saveVirtualAccount(
    virtualAccount: TossPaymentVirtualAccountDto,
    approve: TossPaymentApprove
  ): Promise<TossPaymentVirtualAccount> {}
}
