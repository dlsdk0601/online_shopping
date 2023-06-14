import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { SignInReqDto, SignInResDto } from "./dto/sign-in.dto";
import { GetUser } from "../decorator/user.decorator";
import { CustomRequest, GlobalManager, GlobalUser } from "../type/type";
import { SignUpReqDto, SignUpResDto, SnsSignUpReqDto, SnsSignUpResDto } from "./dto/sign-up.dto";
import { AuthManagerResDto, AuthReqDto, AuthUserResDto } from "./dto/auth.dto";
import { GoogleTokenVerifyReqDto, GoogleTokenVerifyResDto } from "./dto/google-auth.dto";
import { SignOutReqDto, SignOutResDto } from "./dto/sign-out.dto";
import { KakaoCodeVerifyReqDto, KakaoCodeVerifyResDto } from "./dto/kakao-auth.dto";
import { NaverCodeVerifyReqDto, NaverCodeVerifyResDto } from "./dto/naver-auth.dto";

@ApiTags("auth")
@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("/sign-in")
  @ApiCreatedResponse({ type: SignInResDto, description: "local 로그인" })
  signIn(@GetUser() user: GlobalUser, @Body() body: SignInReqDto, @Req() req: CustomRequest) {
    const pk: number = user.pk;
    return this.authService.signIn(pk, req);
  }

  @UseGuards(AuthGuard("admin-local"))
  @Post("admin/sign-in")
  @ApiCreatedResponse({ type: SignInResDto, description: "admin 로그인" })
  adminSignIn(
    @GetUser() user: GlobalManager,
    @Req() req: CustomRequest,
    @Body() body: SignInReqDto
  ) {
    const pk: number = user.pk;
    return this.authService.adminSignIn(pk, req);
  }

  @Post("/sns-sign-up")
  @ApiCreatedResponse({ type: SnsSignUpResDto, description: "sns 회원가입" })
  async snsSignUp(@Body() body: SnsSignUpReqDto, @Req() req: CustomRequest) {
    return this.authService.snsSignUp(body, req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("auth")
  @ApiCreatedResponse({ type: AuthUserResDto })
  getUserDataInfo(@Body() body: AuthReqDto, @GetUser() user: GlobalUser) {
    return user;
  }

  @UseGuards(AuthGuard("admin-jwt"))
  @Post("admin/auth")
  @ApiCreatedResponse({ type: AuthManagerResDto })
  managerInfo(@Body() body: AuthReqDto, @GetUser() user: GlobalManager) {
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

  @UseGuards(AuthGuard("admin-jwt"))
  @Post("admin/sign-out")
  @ApiCreatedResponse({ type: SignOutResDto, description: "로그아웃" })
  managerSignOut(@Body() body: SignOutReqDto, @GetUser() manager: GlobalManager) {
    return this.authService.managerSignOut(manager);
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
