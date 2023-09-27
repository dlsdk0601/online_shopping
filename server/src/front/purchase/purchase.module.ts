import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import { AssetService } from "../../asset/asset.service";
import { HttpService } from "../http/http.service";
import { Payment, TossPaymentApprove, TossPaymentApproveCard } from "../../entities/payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      PurchaseItem,
      Payment,
      TossPaymentApprove,
      TossPaymentApproveCard,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, AssetService, ConfigService, HttpService],
})
export class PurchaseModule {}
