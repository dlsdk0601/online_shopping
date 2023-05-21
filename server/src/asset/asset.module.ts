import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetService } from "./asset.service";
import { AssetController } from "./asset.controller";
import { Asset } from "../entities/asset.entity";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Asset])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
