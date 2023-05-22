import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerModule } from "./manager/manager.module";
import { UserModule } from "./user/user.module";
import { typeOrmModuleOptions } from "./database/ormconfig";
import { envValidation } from "./lib/envValidation";
import { AuthModule } from "./auth/auth.module";
import { AssetModule } from "./asset/asset.module";

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
  ],
})
export class AppModule {}
