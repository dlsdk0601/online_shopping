import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import {
  ShowUserReqDto,
  ShowUserResDto,
  UserListReqDto,
  UserListResDto,
} from "./dto/show-user.dto";
import { EditUserReqDto, EditUserResDto } from "./dto/edit-user.dto";
import { SelectUserReqDto, SelectUserResDto } from "./dto/select-user.dto";

@Controller("/admin/user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/user-list")
  @UseGuards(AuthGuard("admin-jwt"))
  @ApiCreatedResponse({ type: UserListResDto })
  userList(@Body() body: UserListReqDto) {
    return this.userService.list(body);
  }

  @Post("/show-user")
  @UseGuards(AuthGuard("admin-jwt"))
  @ApiCreatedResponse({ type: ShowUserResDto })
  async findOne(@Body() body: ShowUserReqDto) {
    return this.userService.show(body.pk);
  }

  // 관리자에게 직접적으로 수정 문의를 줬을 경우, 사용할 API
  // 그렇기 때문에 실제로 수정 할 수 있는 데이터는 휴대폰 번호와 LocalUser 일 경우에는 이메일 까지
  @Post("/edit-user")
  @UseGuards(AuthGuard("admin-jwt"))
  @ApiCreatedResponse({ type: EditUserResDto })
  async editOne(@Body() body: EditUserReqDto) {
    return this.userService.update(body);
  }

  @Post("select-user")
  @UseGuards(AuthGuard("admin-jwt"))
  @ApiCreatedResponse({ type: SelectUserResDto })
  async selectUser(@Body() body: SelectUserReqDto) {
    return this.userService.selectUser();
  }

  // 회원 가입 탈퇴
  // @Post("/delete-user")
  // @ApiCreatedResponse({ type: DeleteUserResDto })
  // @Roles(ManagerType.MANAGER)
  // remove(@Body() body: DeleteUserReqDto) {
  //   return this.userService.remove(body.pk);
  // }
}
