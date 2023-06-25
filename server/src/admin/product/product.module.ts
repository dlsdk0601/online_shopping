import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AssetService } from "../../asset/asset.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService, AssetService],
})
export class ProductModule {}
