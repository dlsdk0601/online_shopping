import { Injectable, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { OrderListReqDto, OrderListResDto } from "./dto/list-purchase.dto";
import { Payment } from "../../entities/payment.entity";
import { LIMIT } from "../../type/pagination.dto";
import { TossPaymentStatus } from "../../type/commonType";
import errorMessage from "../../config/errorMessage";
import { AssetService } from "../../asset/asset.service";
import { ShowOrderReqDto } from "../purchase/dto/show-order.dto";

@Injectable()
export class OrderService {
  constructor(private assetService: AssetService) {}
  async list(body: OrderListReqDto) {
    const [payments, count] = await Payment.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        payment_approve: true,
        purchase: true,
      },
    });

    const list = payments
      .filter(
        (item) =>
          item.payment_approve?.status === TossPaymentStatus.READY ||
          item.payment_approve?.status === TossPaymentStatus.DONE ||
          item.payment_approve?.status === TossPaymentStatus.CANCELED ||
          item.payment_approve?.status === TossPaymentStatus.WAITING_FOR_DEPOSIT
      )
      .map((item) => ({
        pk: item.pk,
        orderCode: item.purchase.order_code,
        price: item.payment_approve?.total_amount ?? 0,
        method: item.payment_approve?.method ?? "",
        status: item.payment_approve?.status ?? TossPaymentStatus.ABORTED,
        createAt: item.create_at.toString(),
      }));

    return new OrderListResDto(list, count, body.page);
  }

  async show(body: ShowOrderReqDto) {
    const payment = await Payment.findOne({
      where: { pk: body.pk },
      relations: {
        payment_approve: true,
      },
    });

    if (isNil(payment)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: payment.pk,
      totalPrice: payment.payment_approve?.total_amount ?? 0,
      title: payment.payment_approve?.order_name ?? "",
      orderId: payment.payment_approve?.order_id ?? "",
    };
  }
}
