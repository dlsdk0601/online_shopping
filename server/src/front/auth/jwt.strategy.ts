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
import errorMessage from "../../config/errorMessage";
import { getLastAuth } from "../../ex/ex";
import { FrontUserAuth, User } from "../../entities/user.entity";
import { config } from "../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료된 토큰을 무시하지 않고 401 응답을 전송
      secretOrKey: config.secret,
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
        cart: {
          cart_products: {
            product: {
              main_image: true,
            },
          },
        },
      },
      order: {
        cart: {
          cart_products: {
            pk: "desc",
          },
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
      return user;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
