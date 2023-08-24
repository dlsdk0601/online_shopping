import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "../../entities/user-authentication.entity";
import { User } from "../../entities/user.entity";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { GoogleUser } from "../../entities/google-user.entity";
import { KakaoUser } from "../../entities/kakao-user.entity";
import { NaverUser } from "../../entities/naver-user.entity";
import { LocalUser } from "../../entities/local-user.entity";
import { HttpService } from "../http/http.service";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get("JWT_SECRET"),
        signOptions: { expiresIn: config.get("COOKIE_EXP") },
      }),
    }),
    TypeOrmModule.forFeature([
      LocalAuthentication,
      GoogleAuthentication,
      KakaoAuthentication,
      NaverAuthentication,
      User,
      GoogleUser,
      KakaoUser,
      NaverUser,
      LocalUser,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, HttpService],
})
export class AuthModule {}
