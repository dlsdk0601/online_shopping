import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscribe, SubscribeHistory } from "../../entities/subscribe.entity";
import { SubscribeController } from "./subscribe.controller";
import { SubscribeService } from "./subscribe.service";

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe, SubscribeHistory])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
