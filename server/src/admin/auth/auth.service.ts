import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import moment from "moment/moment";
import { isNil } from "lodash";
import { JwtService } from "@nestjs/jwt";
import { CustomRequest, GlobalManager } from "../../type/type";
import Authentication from "../../entities/manager-authentication.entity";
import { getDeviceInfo, getLastAuth } from "../../ex/ex";
import errorMessage from "../../constant/errorMessage";
import { ManagerService } from "../manager/manager.service";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private managerService: ManagerService) {}

  async signIn(pk: number, req: CustomRequest) {
    const token = this.jwtService.sign({ pk });

    const manager = await this.managerService.findOneOr404(pk);
    const auth = new Authentication();
    auth.manager = manager;
    auth.token = token;
    auth.ip = req.ip;
    auth.device = getDeviceInfo(req);
    auth.expired_at = moment().add("7", "d").toDate();

    try {
      await auth.save();

      return { token };
    } catch (e) {
      throw new UnauthorizedException(errorMessage.SIGN_IN_FAILED);
    }
  }

  async signOut(manager: GlobalManager) {
    const auths = await Authentication.find({ where: { manager } });
    const auth: Authentication | undefined = getLastAuth(auths);

    if (isNil(auth)) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
    try {
      await Authentication.update(auth.pk, { expired_at: moment().toDate() });

      return { result: true };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.FAIL_SIGN_OUT);
    }
  }
}
