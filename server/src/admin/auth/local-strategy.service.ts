import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { isNil } from "lodash";
import Manager from "../../entities/manager.entity";
import errorMessage from "../../config/errorMessage";
import { compare } from "../../ex/bcryptEx";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "admin-local") {
  constructor() {
    super({
      usernameField: "id",
    });
  }

  async validate(id: string, password: string) {
    const manager = await Manager.findOne({ where: { id } });

    if (isNil(manager)) {
      throw new UnauthorizedException(errorMessage.USER_NOT_FOUND_ERR);
    }

    const isValid = await compare(password, manager.password_hash);

    if (!isValid) {
      throw new UnauthorizedException(errorMessage.SIGN_IN_FAILED);
    }

    return {
      pk: manager.pk,
      type: manager.type,
      name: manager.name,
      id: manager.id,
      email: manager.email,
    };
  }
}
