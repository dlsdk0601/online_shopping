import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerModule } from "./admin/manager/manager.module";
import { UserModule } from "./admin/user/user.module";
import { typeOrmModuleOptions } from "./database/ormconfig";
import { envValidation } from "./lib/envValidation";
import { AuthModule } from "./front/auth/auth.module";
import { AssetModule } from "./asset/asset.module";
import { AdminSubscribeModule } from "./subscribe/subscribe.module";
import { AdminAuthModule } from "./admin/auth/admin-auth.module";
import { SubscribeModule } from "./front/subscribe/subscribe.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ManagerModule,
    UserModule,
    AuthModule,
    AssetModule,
    AdminAuthModule,
    AdminSubscribeModule,
    SubscribeModule,
  ],
})
export class AppModule {}
