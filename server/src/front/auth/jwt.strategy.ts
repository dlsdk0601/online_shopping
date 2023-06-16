import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { isNil } from "lodash";
import moment from "moment";
import constant from "../../config/constant";
import errorMessage from "../../config/errorMessage";
import { getLastAuth } from "../../ex/ex";
import { FrontUserAuth, User } from "../../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료된 토큰을 무시하지 않고 401 응답을 전송
      secretOrKey: constant().Jwt.Secret,
    });
  }

  async validate(payload: { pk: number; iat: number; exp: number }) {
    const pk = payload.pk;
    const user = await User.findOne({
      where: { pk },
      relations: {
        localUser: {
          auth: true,
        },
        googleUser: {
          auth: true,
        },
        kakaoUser: {
          auth: true,
        },
        naverUser: {
          auth: true,
        },
      },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.NOT_TOKEN_USER);
    }

    const lastAuth: FrontUserAuth | undefined = getLastAuth(user.auths);

    if (isNil(lastAuth)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    try {
      lastAuth.expired_at = moment().add("7", "d").toDate();
      await lastAuth.save();
      return { pk, type: user.type, name: user.name, phone: user.phone };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
