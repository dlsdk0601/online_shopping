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
import { ManagerService } from "../manager/manager.service";
import errorMessage from "../../config/errorMessage";
import { getLastAuth } from "../../ex/ex";
import Authentication from "../../entities/manager-authentication.entity";
import { config } from "../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(private managerService: ManagerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료된 토큰을 무시하지 않고 401 응답을 전송
      secretOrKey: config.secret,
    });
  }

  async validate(payload) {
    const pk: number = payload.pk;
    const manager = await this.managerService.findOneOrNull(pk);

    if (isNil(manager)) {
      throw new NotFoundException(errorMessage.INTERNAL_FAILED);
    }

    const lastAuth: Authentication | undefined = getLastAuth(manager.authentications);

    if (isNil(lastAuth)) {
      throw new UnauthorizedException(errorMessage.ACCESS_TOKEN_EXPIRED);
    }

    try {
      await Authentication.update(lastAuth.pk, {
        expired_at: moment().add("7", "d").toISOString(),
      });

      return {
        pk: manager.pk,
        type: manager.type,
        name: manager.name,
        id: manager.id,
        email: manager.email,
      };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.NOT_AUTHENTICATE);
    }
  }
}
