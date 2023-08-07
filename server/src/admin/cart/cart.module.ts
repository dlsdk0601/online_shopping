import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "../../entities/cart.entity";
import { AssetService } from "../../asset/asset.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService, AssetService],
})
export class CartModule {}
