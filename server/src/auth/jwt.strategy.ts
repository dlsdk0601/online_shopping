import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { isNil } from "lodash";
import moment from "moment";
import { LocalUser } from "src/entities/local-user.entity";
import { AuthService } from "./auth.service";
import { DataType } from "../type/type";
import { UserService } from "../user/user.service";
import { ManagerService } from "../manager/manager.service";
import constant from "../config/constant";
import { UserType } from "../type/commonType";
import errorMessage from "../config/errorMessage";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "../entities/user-authentication.entity";
import Authentication from "../entities/manager-authentication.entity";
import { getLastAuth } from "../ex/ex";
import { GoogleUser } from "../entities/google-user.entity";
import { KakaoUser } from "../entities/kakao-user.entity";
import { NaverUser } from "../entities/naver-user.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private managerService: ManagerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료된 토큰을 무시하지 않고 401 응답을 전송
      secretOrKey: constant().Jwt.Secret,
    });
  }

  async validate(payload) {
    const type: DataType = payload.type;
    const pk: number = payload.pk;
    if (type === "ADMIN") {
      return this.getManagerInfo(pk);
    }
    return this.getUserInfo(pk);
  }

  async getManagerInfo(pk: number) {
    const manager = await this.managerService.findOneOrNull(pk);

    if (isNil(manager)) {
      return {
        pk: null,
        type: null,
        name: null,
        dataType: null,
      };
    }

    try {
      await Authentication.update(pk, { expired_at: moment().add("7", "d").toISOString() });

      return {
        pk: manager.pk,
        type: manager.type,
        name: manager.name,
        dataType: "ADMIN",
      };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.NOT_AUTHENTICATE);
    }
  }

  async getUserInfo(pk: number) {
    const user = await this.userService.findOneOrNull(pk);
    if (isNil(user)) {
      return {
        pk: null,
        type: null,
        name: null,
        dataType: null,
      };
    }

    await this.userAuthUpdate(user.pk, user.type);

    return {
      pk: user.pk,
      type: user.type,
      name: user.name,
      dataType: "FRONT",
    };
  }

  async googleAuthenticationUpdate(user: User) {
    const googleUser = await GoogleUser.findOne({
      where: {
        pk: user.pk,
      },
      relations: { auth: true },
    });

    if (isNil(googleUser)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    const lastAuth: GoogleAuthentication | undefined = getLastAuth(googleUser.auth);

    if (isNil(lastAuth)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    return GoogleAuthentication.update(lastAuth.pk, {
      expired_at: moment().add("7", "d").toISOString(),
    });
  }

  async localAuthenticationUpdate(user: User) {
    const localUser = await LocalUser.findOne({
      where: {
        pk: user.pk,
      },
      relations: { auth: true },
    });

    if (isNil(localUser)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    const lastAuth: LocalAuthentication | undefined = getLastAuth(localUser.auth);

    if (isNil(lastAuth)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    return LocalAuthentication.update(lastAuth.pk, {
      expired_at: moment().add("7", "d").toISOString(),
    });
  }

  async userAuthUpdate(pk: number, type: UserType) {
    let user: LocalUser | GoogleUser | KakaoUser | NaverUser | null = null;

    if (type === UserType.LOCAL) {
      user = await LocalUser.findOne({ where: { pk }, relations: { auth: true } });
    }
    if (type === UserType.GOOGLE) {
      user = await GoogleUser.findOne({ where: { pk }, relations: { auth: true } });
    }
    if (type === UserType.KAKAO) {
      user = await KakaoUser.findOne({ where: { pk }, relations: { auth: true } });
    }
    if (type === UserType.NAVER) {
      user = await NaverUser.findOne({ where: { pk }, relations: { auth: true } });
    }

    if (isNil(user)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    const lastAuth:
      | LocalAuthentication
      | GoogleAuthentication
      | NaverAuthentication
      | KakaoAuthentication
      | undefined = getLastAuth(user.auth);

    if (isNil(lastAuth)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    lastAuth.expired_at = moment().add("7", "d").toDate();
    await lastAuth.save();
  }
}
