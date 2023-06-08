import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { SubscribeService } from "./subscribe.service";
import { AddSubscribeReqDto, AddSubscribeResDto } from "./dto/add-subscribe.dto";
import { GetUser } from "../decorator/user.decorator";
import { GlobalUser, ManagerType } from "../type/type";
import { DeleteSubscribeReqDto, DeleteSubscribeResDto } from "./dto/delete-subscribe.dto";
import { Roles } from "../decorator/roles.decorator";

@Controller()
@ApiTags("subscribe")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post("/add-subscribe")
  @ApiCreatedResponse({ type: AddSubscribeResDto })
  @UseGuards(AuthGuard("jwt"))
  addSubscribe(@Body() body: AddSubscribeReqDto, @GetUser() user: GlobalUser) {
    return this.subscribeService.create(body, user.pk);
  }

  // TODO :: role 이 안먹힘 확인해서 수정하기
  @Post("/admin/delete-subscribe")
  @Roles(ManagerType.MANAGER)
  @ApiCreatedResponse({ type: DeleteSubscribeResDto })
  deleteSubscribe(@Body() body: DeleteSubscribeReqDto) {
    return this.subscribeService.delete(body);
  }
}
