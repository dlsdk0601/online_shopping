import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import { AssetService } from "../../asset/asset.service";
import { HttpService } from "../http/http.service";
import { Payment } from "../../entities/payment.entity";
import {
  PaymentCancelHistory,
  TossPaymentApprove,
  TossPaymentApproveCard,
  TossPaymentEasypay,
  TossPaymentFailure,
  TossPaymentVirtualAccount,
} from "../../entities/payment-approve.entity";

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
      TossPaymentFailure,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, AssetService, ConfigService, HttpService],
})
export class PurchaseModule {}
