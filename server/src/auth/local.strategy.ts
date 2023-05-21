import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { isNil } from "lodash";
import { AuthService } from "./auth.service";
import { SignInReqDto } from "./dto/sign-in.dto";
import errorMessage from "../config/errorMessage";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "id",
    });
  }

  async validate(id: string, password: string) {
    const signInReqDto: SignInReqDto = { id, password };
    const res = await this.authService.validateManagerOrUser(signInReqDto);

    if (isNil(res)) {
      throw new UnauthorizedException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return { pk: res.pk, dataType: res.dataType };
  }
}
