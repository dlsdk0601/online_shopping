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
  PaymentFailure,
  TossPaymentApprove,
  TossPaymentApproveCard,
  TossPaymentEasypay,
} from "../../entities/payment-approve.entity";
import { CartService } from "../cart/cart.service";

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
      PaymentFailure,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, AssetService, ConfigService, HttpService, CartService],
})
export class PurchaseModule {}
