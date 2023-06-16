import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { isNil } from "lodash";
import { AuthService } from "./auth.service";
import errorMessage from "../../config/errorMessage";
import { User } from "../../entities/user.entity";
import { compare } from "../../ex/bcryptEx";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "id",
    });
  }

  async validate(id: string, password: string) {
    const user = await User.findOne({
      where: { localUser: { id } },
      relations: { localUser: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    const isValidPassword = await compare(password, user.localUser.password_hash);

    if (!isValidPassword) {
      throw new UnauthorizedException(errorMessage.SIGN_IN_FAILED);
    }

    return { pk: user.pk, type: user.type, name: user.name, phone: user.phone };
  }
}
