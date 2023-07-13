import { Module } from "@nestjs/common";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { ProductModule } from "./product/product.module";
import { HomeModule } from "./home/home.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [SubscribeModule, ProductModule, HomeModule, AuthModule],
})
export class FrontAppModule {}
