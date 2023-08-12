import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerModule } from "./manager/manager.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { ProductModule } from "./product/product.module";
import { BannerModule } from "./banner/banner.module";
import { CartModule } from "./cart/cart.module";
import { envValidation } from "../lib/envValidation";
import { typeOrmModuleOptions } from "../database/ormconfig";
import { AssetModule } from "../asset/asset.module";
import { PurchaseModule } from './purchase/purchase.module';

// 전역 변수 설정 및 orm 설정을 front / admin 따로 해준다.
// 다른 설정이 들어 갈 수도 있기 때문에
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    AssetModule,
    ManagerModule,
    UserModule,
    AuthModule,
    SubscribeModule,
    ProductModule,
    BannerModule,
    CartModule,
    PurchaseModule,
  ],
})
export class AdminAppModule {}
