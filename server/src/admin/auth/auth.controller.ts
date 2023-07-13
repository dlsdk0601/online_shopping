import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { GetUser } from "../../decorator/user.decorator";
import { CustomRequest, GlobalManager } from "../../type/type";
import { SignInReqDto, SignInResDto } from "./dto/sign-in.dto";
import { AuthManagerResDto, AuthReqDto } from "./dto/auth.dto";
import { SignOutReqDto, SignOutResDto } from "./dto/sign-out.dto";

@ApiTags("admin-auth")
@Controller("admin")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("admin-local"))
  @Post("sign-in")
  @ApiCreatedResponse({ type: SignInResDto, description: "admin 로그인" })
  adminSignIn(
    @GetUser() user: GlobalManager,
    @Req() req: CustomRequest,
    @Body() body: SignInReqDto
  ) {
    const pk: number = user.pk;
    return this.authService.signIn(pk, req);
  }

  @UseGuards(AuthGuard("admin-jwt"))
  @Post("auth")
  @ApiCreatedResponse({ type: AuthManagerResDto })
  managerInfo(@Body() body: AuthReqDto, @GetUser() user: GlobalManager) {
    return user;
  }

  @UseGuards(AuthGuard("admin-jwt"))
  @Post("admin/sign-out")
  @ApiCreatedResponse({ type: SignOutResDto, description: "로그아웃" })
  managerSignOut(@Body() body: SignOutReqDto, @GetUser() manager: GlobalManager) {
    return this.authService.signOut(manager);
  }
}
