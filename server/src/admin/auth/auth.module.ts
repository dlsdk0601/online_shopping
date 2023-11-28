import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerModule } from "../manager/manager.module";
import Authentication from "../../entities/manager-authentication.entity";
import Manager from "../../entities/manager.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt-strategy.service";
import { LocalStrategy } from "./local-strategy.service";
import { config } from "../../config";

@Module({
  imports: [
    ManagerModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: config.secret,
        signOptions: { expiresIn: config.exp },
      }),
    }),
    TypeOrmModule.forFeature([Authentication, Manager]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthService],
})
export class AuthModule {}
