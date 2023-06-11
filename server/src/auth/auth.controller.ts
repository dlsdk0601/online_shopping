import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags, refs } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { SignInReqDto, SignInResDto } from "./dto/sign-in.dto";
import { GetUser } from "../decorator/user.decorator";
import { CustomRequest, DataType, GlobalUser } from "../type/type";
import { SignUpReqDto, SignUpResDto, SnsSignUpReqDto, SnsSignUpResDto } from "./dto/sign-up.dto";
import { AuthManagerResDto, AuthReqDto, AuthUserResDto } from "./dto/auth.dto";
import { GoogleTokenVerifyReqDto, GoogleTokenVerifyResDto } from "./dto/google-auth.dto";
import { SignOutReqDto, SignOutResDto } from "./dto/sign-out.dto";
import { KakaoCodeVerifyReqDto, KakaoCodeVerifyResDto } from "./dto/kakao-auth.dto";
import { NaverCodeVerifyReqDto, NaverCodeVerifyResDto } from "./dto/naver-auth.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO :: 로그인 찢자. 보안이 너무 뚫린다.
  @UseGuards(AuthGuard("local"))
  @Post("/sign-in")
  @ApiCreatedResponse({ type: SignInResDto, description: "local 로그인" })
  signIn(@GetUser() user, @Body() body: SignInReqDto, @Req() req: CustomRequest) {
    const pk: number = user.pk;
    const type: DataType = user.dataType;
    return this.authService.signIn(pk, type, req);
  }

  @Post("/sns-sign-up")
  @ApiCreatedResponse({ type: SnsSignUpResDto, description: "sns 회원가입" })
  async snsSignUp(@Body() body: SnsSignUpReqDto, @Req() req: CustomRequest) {
    return this.authService.snsSignUp(body, req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @ApiExtraModels(AuthManagerResDto, AuthUserResDto)
  @ApiOkResponse({
    schema: { oneOf: refs(AuthManagerResDto, AuthUserResDto) },
    description: "유저 정보 조회",
  })
  getUserDataInfo(@Body() body: AuthReqDto, @GetUser() user: GlobalUser) {
    return user;
  }

  @Post("/google-token-verify")
  @ApiCreatedResponse({ type: GoogleTokenVerifyResDto, description: "구글 토큰 검증" })
  googleTokenVerify(@Body() body: GoogleTokenVerifyReqDto, @Req() req: CustomRequest) {
    return this.authService.validateGoogleToken(body.token, req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/sign-out")
  @ApiCreatedResponse({ type: SignOutResDto, description: "로그아웃" })
  signOut(@Body() body: SignOutReqDto, @GetUser() user: GlobalUser) {
    return this.authService.signOut(user);
  }

  @Post("/kakao-code-verify")
  @ApiCreatedResponse({ type: KakaoCodeVerifyResDto, description: "카카오 토큰 검증" })
  async kakaoCodeVerify(@Body() body: KakaoCodeVerifyReqDto, @Req() req: CustomRequest) {
    return this.authService.validateKakaoToken(body.code, req);
  }

  @Post("/sign-up")
  @ApiCreatedResponse({ type: SignUpResDto, description: "회원가입" })
  async signUp(@Body() body: SignUpReqDto, @Req() req: CustomRequest) {
    return this.authService.signUp(body, req);
  }

  @Post("/naver-code-verify")
  @ApiCreatedResponse({ type: NaverCodeVerifyResDto, description: "네이버 토큰 검증" })
  async naverCodeVerify(@Body() body: NaverCodeVerifyReqDto, @Req() req: CustomRequest) {
    return this.authService.validateNaverCode(body, req);
  }
}
