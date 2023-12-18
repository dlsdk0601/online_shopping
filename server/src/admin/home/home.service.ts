import { Injectable } from "@nestjs/common";
import moment from "moment";
import { Between, FindOperator, LessThan } from "typeorm";
import { HomeReqDto } from "./dto/home.dto";
import { User } from "../../entities/user.entity";
import { Subscribe } from "../../entities/subscribe.entity";
import { PaymentCancelHistory, TossPaymentApprove } from "../../entities/payment-approve.entity";

@Injectable()
export class HomeService {
  constructor() {}
  async home(body: HomeReqDto) {
    const today = moment().clone();
    const firstWeek = today.startOf("week");

    const lastCreateOption = {
      create_at: LessThan(firstWeek.toDate()),
    };

    const lastRefundOption = {
      canceled_at: LessThan(firstWeek.toDate()),
    };

    const newCreateOption = {
      create_at: Between(firstWeek.toDate(), today.toDate()),
    };

    const newRefundOption = {
      canceled_at: Between(firstWeek.toDate(), today.toDate()),
    };

    const { newUserCount, newUserRate } = await this.userStatics(lastCreateOption, newCreateOption);

    const { newSalesCount, newSaleRate } = await this.saleStatics(
      lastCreateOption,
      newCreateOption
    );

    const { newSubscribeCount, newSubscribeRate } = await this.subscribeStatics(
      lastCreateOption,
      newCreateOption
    );

    const { newRefundCount, newRefundRate } = await this.refundStatics(
      lastRefundOption,
      newRefundOption
    );

    return {
      newUserCount,
      newUserRate,
      newSalesCount,
      newSaleRate,
      newSubscribeCount,
      newSubscribeRate,
      newRefundCount,
      newRefundRate,
    };
  }

  async userStatics(
    lastOption: { create_at: FindOperator<Date> },
    newOption: { create_at: FindOperator<Date> }
  ) {
    const lastUserCount = await User.count({
      where: lastOption,
    });

    const newUserCount = await User.count({
      where: newOption,
    });

    return { newUserCount, newUserRate: this.rate(lastUserCount, newUserCount) };
  }

  async saleStatics(
    lastOption: { create_at: FindOperator<Date> },
    newOption: { create_at: FindOperator<Date> }
  ) {
    const lastSalesCount = await TossPaymentApprove.count({
      where: lastOption,
    });

    const newSalesCount = await TossPaymentApprove.count({
      where: newOption,
    });

    return { newSalesCount, newSaleRate: this.rate(lastSalesCount, newSalesCount) };
  }

  async subscribeStatics(
    lastOption: { create_at: FindOperator<Date> },
    newOption: { create_at: FindOperator<Date> }
  ) {
    const lastSubscribeCount = await Subscribe.count({
      where: lastOption,
    });

    const newSubscribeCount = await Subscribe.count({
      where: newOption,
    });

    return {
      newSubscribeCount,
      newSubscribeRate: this.rate(lastSubscribeCount, newSubscribeCount),
    };
  }

  async refundStatics(
    lastOption: { canceled_at: FindOperator<Date> },
    newOption: { canceled_at: FindOperator<Date> }
  ) {
    const lastRefundCount = await PaymentCancelHistory.count({
      where: lastOption,
    });

    const newRefundCount = await PaymentCancelHistory.count({
      where: newOption,
    });

    return {
      newRefundCount,
      newRefundRate: this.rate(lastRefundCount, newRefundCount),
    };
  }

  rate(oldCount: number, newCount: number) {
    if (oldCount === 0) {
      return 100;
    }

    return ((newCount / oldCount) * 100).toFixed(2);
  }
}
