import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { ProductModule } from "./product/product.module";
import { HomeModule } from "./home/home.module";
import { AuthModule } from "./auth/auth.module";
import { typeOrmModuleOptions } from "../database/ormconfig";
import { envValidation } from "../lib/envValidation";
import { AssetModule } from "../asset/asset.module";

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
    SubscribeModule,
    ProductModule,
    HomeModule,
    AuthModule,
  ],
})
export class FrontAppModule {}
