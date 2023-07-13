import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscribeService } from "./subscribe.service";
import { SubscribeController } from "./subscribe.controller";
import { Subscribe, SubscribeHistory } from "../../entities/subscribe.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe, SubscribeHistory])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
