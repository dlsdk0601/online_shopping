import { Injectable, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { OrderListReqDto, OrderListResDto } from "./dto/list-purchase.dto";
import { Payment } from "../../entities/payment.entity";
import { LIMIT } from "../../type/pagination.dto";
import { TossPaymentStatus } from "../../type/commonType";
import { User } from "../../entities/user.entity";
import errorMessage from "../../config/errorMessage";
import { AssetService } from "../../asset/asset.service";
import { ShowOrderReqDto } from "../purchase/dto/show-order.dto";

@Injectable()
export class OrderService {
  constructor(private assetService: AssetService) {}
  async list(body: OrderListReqDto) {
    const [payment, count] = await Payment.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        payment_approve: true,
        purchase: true,
      },
    });

    const list = payment.map((item) => ({
      pk: item.pk,
      orderCode: item.purchase.order_code,
      price: item.payment_approve?.total_amount ?? 0,
      method: item.payment_approve?.method ?? "",
      status: item.payment_approve?.status ?? TossPaymentStatus.ABORTED,
      createAt: item.create_at.toString(),
    }));

    return new OrderListResDto(list, count, body.page);
  }

  show(body: ShowOrderReqDto, user: User) {
    const purchase = user.purchases.find((item) => item.pk === body.pk);

    if (isNil(purchase)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: purchase.pk,
      totalPrice: purchase.totalPrice,
      title: purchase.title,
      orderId: purchase.order_code,
    };
  }
}
