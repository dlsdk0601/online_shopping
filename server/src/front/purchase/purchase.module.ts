import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import { AssetService } from "../../asset/asset.service";
import { HttpService } from "../http/http.service";

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseItem])],
  controllers: [PurchaseController],
  providers: [PurchaseService, AssetService, ConfigService, HttpService],
})
export class PurchaseModule {}
