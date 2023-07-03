import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";
import { Product } from "../../entities/product.entity";
import { AssetService } from "../../asset/asset.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [HomeController],
  providers: [HomeService, AssetService],
})
export class HomeModule {}
