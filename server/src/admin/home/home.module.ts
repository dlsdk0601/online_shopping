import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";
import { User } from "../../entities/user.entity";
import { Subscribe } from "../../entities/subscribe.entity";
import { PaymentCancelHistory, TossPaymentApprove } from "../../entities/payment-approve.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscribe, PaymentCancelHistory, TossPaymentApprove])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
