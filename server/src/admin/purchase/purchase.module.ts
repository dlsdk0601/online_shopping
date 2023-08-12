import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseItem])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
