import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { google } from "googleapis";
import { isNil } from "lodash";
import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";
import moment from "moment";
import axios from "axios";
import { GoogleUser } from "src/entities/google-user.entity";
import { getHash } from "../../ex/bcryptEx";
import errorMessage from "../../config/errorMessage";
import { UserType } from "../../type/commonType";
import { CustomRequest, GlobalUser } from "../../type/type";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "../../entities/user-authentication.entity";
import { getDeviceInfo, getLastAuth } from "../../ex/ex";
import { NaverCodeVerifyReqDto } from "./dto/naver-auth.dto";
import { SignUpReqDto, SnsSignUpReqDto } from "./dto/sign-up.dto";
import { KakaoUser } from "../../entities/kakao-user.entity";
import { NaverUser } from "../../entities/naver-user.entity";
import { LocalUser } from "../../entities/local-user.entity";
import { FrontUserAuth, User } from "../../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

  oauth2Client = new google.auth.OAuth2(
    this.configService.get("GOOGLE_ID"),
    this.configService.get("GOOGLE_SECRET"),
    this.configService.get("GOOGLE_CLIENT_REDIRECT_URL")
  );

  async validateGoogleUser(payload: TokenPayload) {
    const { email, sub, given_name, family_name, name } = payload;

    if (isNil(email) || isNil(sub) || isNil(given_name) || isNil(family_name) || isNil(name)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    const user = await GoogleUser.findOne({ where: { email }, relations: { user: true } });

    if (isNil(user)) {
      // new
      try {
        const user = new User();
        user.type = UserType.GOOGLE;
        user.name = name;
        await user.save();

        const newGoogleUser = new GoogleUser();
        newGoogleUser.sub = sub;
        newGoogleUser.email = email;
        newGoogleUser.social_name = family_name + given_name;
        newGoogleUser.user = user;
        await newGoogleUser.save();

        return null;
      } catch (e) {
        throw new InternalServerErrorException(errorMessage.NOT_FOUND_SNS);
      }
    }

    return user;
  }

  async validateGoogleToken(token: string, req: CustomRequest) {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.configService.get("GOOGLE_ID"),
    });

    const payload = ticket.getPayload();

    if (isNil(payload)) {
      throw new UnauthorizedException(errorMessage.NOT_FOUND_SNS);
    }

    const user = await this.validateGoogleUser(payload);

    if (isNil(user) || isNil(user.user.phone)) {
      return { isSignUp: false, token: null, email: payload.email };
    }

    const jwt = this.jwtService.sign({ pk: user.pk, type: "FRONT" });
    try {
      const googleAuth = new GoogleAuthentication();
      googleAuth.token = jwt;
      googleAuth.ip = req.ip;
      googleAuth.device = getDeviceInfo(req);
      googleAuth.expired_at = moment().add("7", "d").toDate();
      googleAuth.google_user = user;
      await googleAuth.save();

      return { isSignUp: true, token, email: payload.email };
    } catch (e) {
      throw new UnauthorizedException(errorMessage.SNS_SIGN_IN_FAILED);
    }
  }

  async validateKakaoToken(code: string, req: CustomRequest) {
    const url = this.configService.get<string>("KAKAO_CODE_VERIFY_URI") ?? "";
    const kakaoId = this.configService.get("KAKAO_ID") ?? "";
    const contentType = "application/x-www-form-urlencoded;charset=utf-8";

    const codeValid = await axios.post(
      url,
      {
        grant_type: "authorization_code",
        client_id: kakaoId,
        redirect_uri: this.configService.get<string>("KAKAO_FRONT_REDIRECT") ?? "",
        code,
      },
      {
        headers: { "Content-Type": contentType },
      }
    );

    if (isNil(codeValid)) {
      throw new ConflictException(errorMessage.KAKAO_GET_USER_FAILED);
    }

    const accessToken: string = codeValid.data.access_token;
    const userData = await axios.get(this.configService.get("KAKAO_GET_USER_URI") ?? "", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": contentType,
      },
    });

    if (isNil(userData)) {
      throw new ConflictException(errorMessage.KAKAO_GET_USER_FAILED);
    }

    const id: number = userData.data.id;
    const is_email_valid: boolean | undefined = userData.data.kakao_account.is_email_valid;
    const email: string | undefined = userData.data.kakao_account.email;
    const nickname: string = userData.data.kakao_account.profile.nickname;

    if (!is_email_valid || isNil(email)) {
      throw new NotFoundException(errorMessage.KAKAO_GET_USER_FAILED);
    }

    const user = await this.validateKakaoUser(email, id, nickname);

    if (isNil(user) || isNil(user.user.phone)) {
      return { isSignUp: false, token: null, email };
    }

    // login
    const token = this.jwtService.sign({ pk: user.pk, type: "FRONT" });
    try {
      const kakaoAuth = new KakaoAuthentication();
      kakaoAuth.token = token;
      kakaoAuth.ip = req.ip;
      kakaoAuth.device = getDeviceInfo(req);
      kakaoAuth.expired_at = moment().add("7", "d").toDate();
      kakaoAuth.kakao_user = user;
      await kakaoAuth.save();

      return { isSignUp: true, token, email: null };
    } catch (e) {
      throw new UnauthorizedException(errorMessage.SNS_SIGN_IN_FAILED);
    }
  }

  async validateNaverCode(body: NaverCodeVerifyReqDto, req: CustomRequest) {
    const url = this.configService.get<string>("NAVER_CODE_VERIFY_URI") ?? "";
    const naverId = this.configService.get<string>("NAVER_CLIENT_ID") ?? "";
    const redirectUri = this.configService.get<string>("NAVER_GET_USER_URI") ?? "";
    const naverSecretKey = this.configService.get<string>("NAVER_CLIENT_SECRET_KEY") ?? "";

    const codeValid = await axios.get(
      `${url}&client_id=${naverId}&client_secret=${naverSecretKey}&redirect_uri=${redirectUri}&code=${body.code}&state=${body.state}`,
      {
        headers: {
          "X-Naver-Client-Id": naverId,
          "X-Naver-Client-Secret": naverSecretKey,
        },
      }
    );

    if (isNil(codeValid)) {
      throw new ConflictException(errorMessage.NAVER_GET_USER_FAILED);
    }

    const accessToken: string = codeValid.data.access_token;
    const getUserDataUrl = this.configService.get<string>("NAVER_GET_USER_URI") ?? "";
    const userData = await axios.get(getUserDataUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (isNil(userData) || userData.data.resultcode !== "00") {
      throw new ConflictException(errorMessage.NAVER_GET_USER_FAILED);
    }

    const id: string = userData.data.response.id;
    const email: string = userData.data.response.email;
    const phone: string = userData.data.response.mobile;
    const name: string = userData.data.response.name;

    const user = await this.validateNaverUser(id, email, phone, name);

    if (isNil(user)) {
      throw new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
    }

    // login
    const token = this.jwtService.sign({ pk: user.pk, type: "FRONT" });
    try {
      const naverAuth = new NaverAuthentication();
      naverAuth.token = token;
      naverAuth.ip = req.ip;
      naverAuth.device = getDeviceInfo(req);
      naverAuth.expired_at = moment().add("7", "d").toDate();
      naverAuth.naver_user = user;
      await naverAuth.save();

      return { token };
    } catch (e) {
      throw new UnauthorizedException(errorMessage.SNS_SIGN_IN_FAILED);
    }
  }

  async validateKakaoUser(email: string, id: number, nickname: string) {
    const user = await KakaoUser.findOne({ where: { email }, relations: { user: true } });

    if (isNil(user)) {
      try {
        const user = new User();
        user.name = nickname;
        user.type = UserType.KAKAO;
        await user.save();

        const newUser = new KakaoUser();
        newUser.id = id.toString();
        newUser.email = email;
        newUser.social_name = nickname;
        newUser.user = user;
        await newUser.save();

        return null;
      } catch (e) {
        throw new UnauthorizedException(errorMessage.SNS_SIGN_IN_FAILED);
      }
    }

    return user;
  }

  async validateNaverUser(id: string, email: string, phone: string, name: string) {
    const user = await NaverUser.findOne({ where: { email }, relations: { user: true } });

    if (isNil(user)) {
      try {
        const user = new User();
        user.name = name;
        user.type = UserType.NAVER;
        user.phone = phone;
        await user.save();

        const newUser = new NaverUser();
        newUser.id = id;
        newUser.email = email;
        newUser.user = user;
        await newUser.save();

        return newUser;
      } catch (e) {
        throw new UnauthorizedException(errorMessage.SNS_SIGN_IN_FAILED);
      }
    }

    return user;
  }

  async signIn(pk: number, req: CustomRequest) {
    const token = this.jwtService.sign({ pk });

    const user = await this.findLocalUserOneOr404(pk);
    const localAuth = new LocalAuthentication();
    localAuth.local_user = user;
    localAuth.token = token;
    localAuth.ip = req.ip;
    localAuth.device = getDeviceInfo(req);
    localAuth.expired_at = moment().add("7", "d").toDate();

    try {
      await localAuth.save();

      return { token };
    } catch (e) {
      throw new UnauthorizedException(errorMessage.SIGN_IN_FAILED);
    }
  }

  async signUp(body: SignUpReqDto, req: CustomRequest) {
    const isExist = await LocalUser.findOne({
      where: { id: body.id },
      relations: { user: true },
    });

    if (!isNil(isExist)) {
      throw new BadRequestException(errorMessage.ALREADY_SIGN_UP);
    }

    try {
      const passwordHash = await getHash(body.password);
      const user = new User();
      user.name = body.name;
      user.phone = body.phone;
      user.type = UserType.LOCAL;
      await user.save();

      const newLocalUser = new LocalUser();
      newLocalUser.id = body.id;
      newLocalUser.email = body.email;
      newLocalUser.password_hash = passwordHash;
      newLocalUser.user = user;
      await newLocalUser.save();

      const token = this.jwtService.sign({ pk: newLocalUser.pk, type: "FRONT" });

      const localAuth = new LocalAuthentication();
      localAuth.token = token;
      localAuth.ip = req.ip;
      localAuth.device = getDeviceInfo(req);
      localAuth.expired_at = moment().add("7", "d").toDate();
      localAuth.local_user = newLocalUser;
      await localAuth.save();

      return { token };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
    }
  }

  async signOut(user: GlobalUser) {
    const frontUser = await User.findOne({
      where: { pk: user.pk },
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

    if (isNil(frontUser)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    const lastAuth: FrontUserAuth | undefined = getLastAuth(frontUser.auths);

    if (isNil(lastAuth)) {
      throw new InternalServerErrorException(errorMessage.FAIL_SIGN_OUT);
    }

    try {
      lastAuth.expired_at = moment().toDate();
      await lastAuth.save();
      return { result: true };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.FAIL_SIGN_OUT);
    }
  }

  async snsSignUp(body: SnsSignUpReqDto, req: CustomRequest) {
    const isUser = await User.findOne({
      where: {
        kakaoUser: { email: UserType.KAKAO === body.type ? body.email : undefined },
        googleUser: { email: UserType.GOOGLE === body.type ? body.email : undefined },
        naverUser: { email: UserType.NAVER === body.type ? body.email : undefined },
      },
      relations: {
        kakaoUser: true,
        googleUser: true,
        naverUser: true,
      },
    });

    if (isNil(isUser)) {
      throw new ConflictException(errorMessage.SIGN_UP_FAILED);
    }

    isUser.phone = body.phone;
    isUser.name = body.name;

    const token = this.jwtService.sign({ pk: isUser.pk, type: "FRONT" });
    try {
      let auth: GoogleAuthentication | KakaoAuthentication | NaverAuthentication | null = null;
      await isUser.save();
      if (body.type === UserType.GOOGLE) {
        await GoogleUser.save(isUser);
        auth = new GoogleAuthentication();
        auth.google_user = isUser.googleUser;
      }

      if (body.type === UserType.KAKAO) {
        await KakaoUser.save(isUser);
        auth = new KakaoAuthentication();
        auth.kakao_user = isUser.kakaoUser;
      }

      if (body.type === UserType.NAVER) {
        await NaverUser.save(isUser);
        auth = new NaverAuthentication();
        auth.naver_user = isUser.naverUser;
      }

      if (isNil(auth)) {
        return new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
      }

      auth.token = token;
      auth.ip = req.ip;
      auth.device = getDeviceInfo(req);
      auth.expired_at = moment().add("7", "d").toDate();
      await auth.save();

      return { token };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
    }
  }

  async findLocalUserOneOr404(pk: number) {
    const user = await LocalUser.findOne({
      where: { pk },
      relations: { user: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return user;
  }
}
