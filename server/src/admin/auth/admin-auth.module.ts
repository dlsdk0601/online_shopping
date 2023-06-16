import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerModule } from "../manager/manager.module";
import Authentication from "../../entities/manager-authentication.entity";
import Manager from "../../entities/manager.entity";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { AdminJwtStrategy } from "./admin-jwt.strategy";
import { AdminLocalStrategy } from "./admin-local.strategy";

@Module({
  imports: [
    ManagerModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get("JWT_SECRET"),
        signOptions: { expiresIn: config.get("COOKIE_EXP") },
      }),
    }),
    TypeOrmModule.forFeature([Authentication, Manager]),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminJwtStrategy, AdminLocalStrategy, AdminAuthService],
})
export class AdminAuthModule {}
