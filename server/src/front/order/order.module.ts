import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import { Payment } from "../../entities/payment.entity";
import {
  PaymentCancelHistory,
  PaymentFailure,
  TossPaymentApprove,
  TossPaymentApproveCard,
  TossPaymentEasypay,
  TossPaymentVirtualAccount,
} from "../../entities/payment-approve.entity";
import { AssetService } from "../../asset/asset.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      PurchaseItem,
      Payment,
      TossPaymentApprove,
      TossPaymentApproveCard,
      PaymentCancelHistory,
      TossPaymentEasypay,
      TossPaymentVirtualAccount,
      PaymentFailure,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, AssetService, ConfigService],
})
export class OrderModule {}
