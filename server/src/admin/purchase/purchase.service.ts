import { Injectable, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import {
  PurchaseListReqDto,
  PurchaseListResDto,
  ShowPurchaseReqDto,
} from "./dto/show-purchase.dto";
import { LIMIT } from "../../type/pagination.dto";
import errorMessage from "../../constant/errorMessage";
import { Payment } from "../../entities/payment.entity";
import { isNotNil } from "../../ex/ex";
import { PaymentCancelHistory, TossPaymentApprove } from "../../entities/payment-approve.entity";
import { RefundPurchaseReqDto } from "./dto/purchase-refund.dto";
import { HttpService } from "../../front/http/http.service";
import { config } from "../../config";
import {
  TossPaymentHttpApproveResDto,
  TossPaymentHttpCancelReqDto,
} from "../../front/purchase/dto/toss-payment.dto";
import { TossPaymentCancelDto } from "../../front/purchase/dto/common.dto";

@Injectable()
export class PurchaseService {
  constructor(private assetService: AssetService) {}

  async list(body: PurchaseListReqDto) {
    const [payments, count] = await Payment.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        purchase: {
          user: true,
          purchase_items: true,
        },
        payment_approve: true,
      },
    });

    const items = payments
      .filter((item) => isNotNil(item.payment_approve))
      .map((item) => ({
        pk: item.pk,
        name: item.purchase.user.name,
        phone: item.purchase.user.phone ?? "",
        totalPrice: (item.payment_approve as TossPaymentApprove).total_amount,
        orderCode: (item.payment_approve as TossPaymentApprove).order_id, // filter 걸쳐서 무조건 나온다
        method: (item.payment_approve as TossPaymentApprove).method,
        createAt: item.create_at,
      }));

    return new PurchaseListResDto(items, count, body.page);
  }

  async show(body: ShowPurchaseReqDto) {
    const payment = await Payment.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        purchase: {
          purchase_items: {
            product: {
              main_image: true,
            },
          },
          user: true,
        },
        payment_approve: true,
      },
    });

    if (isNil(payment) || isNil(payment.payment_approve)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: payment.pk,
      name: payment.purchase.user.name,
      phone: payment.purchase.user.phone ?? "",
      orderCode: payment.payment_approve.order_id,
      createAt: payment.create_at,
      purchaseItems: payment.purchase.purchase_items.map((item) => ({
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        status: item.status,
        image: this.assetService.getFileSet(item.product.main_image),
      })),
    };
  }
}
