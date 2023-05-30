import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import {
  ShowUserReqDto,
  ShowUserResDto,
  UserListReqDto,
  UserListResDto,
} from "./dto/show-user.dto";
import { Roles } from "../decorator/roles.decorator";
import { ManagerType } from "../type/type";
import { DeleteUserReqDto, DeleteUserResDto } from "./dto/delete-user.dto";

@Controller("admin/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/user-list")
  @ApiCreatedResponse({ type: UserListResDto })
  @Roles(ManagerType.MANAGER)
  userList(@Body() body: UserListReqDto) {
    return this.userService.getUserList(body);
  }

  @Post("/show-user")
  @ApiCreatedResponse({ type: ShowUserResDto })
  async findOne(@Body() body: ShowUserReqDto) {
    return this.userService.findUserOneOr404(body.pk);
  }

  @Post("/delete-user")
  @ApiCreatedResponse({ type: DeleteUserResDto })
  @Roles(ManagerType.MANAGER)
  remove(@Body() body: DeleteUserReqDto) {
    return this.userService.remove(body.pk);
  }
}
