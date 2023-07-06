import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerService } from "./banner.service";
import { BannerController } from "./banner.controller";
import { AssetService } from "../../asset/asset.service";
import { MainBanner } from "../../entities/main-banner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MainBanner])],
  controllers: [BannerController],
  providers: [BannerService, AssetService],
})
export class BannerModule {}
