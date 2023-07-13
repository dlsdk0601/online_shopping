import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./database/ormconfig";
import { envValidation } from "./lib/envValidation";
import { AssetModule } from "./asset/asset.module";
import { FrontAppModule } from "./front/front.module";
import { AdminAppModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    AssetModule,
    AdminAppModule,
    FrontAppModule,
  ],
})
export class AppModule {}
