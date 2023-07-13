import { Module } from "@nestjs/common";
import { ManagerModule } from "./manager/manager.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { ProductModule } from "./product/product.module";
import { BannerModule } from "./banner/banner.module";
import { CartModule } from "./cart/cart.module";

@Module({
  imports: [
    ManagerModule,
    UserModule,
    AuthModule,
    SubscribeModule,
    ProductModule,
    BannerModule,
    CartModule,
  ],
})
export class AdminAppModule {}
