import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { SubscribeService } from "./subscribe.service";
import { ManagerType } from "../../type/type";
import { DeleteSubscribeReqDto, DeleteSubscribeResDto } from "./dto/delete-subscribe.dto";
import { Roles } from "../../decorator/roles.decorator";
import {
  SubscribeHistoryListReqDto,
  SubscribeHistoryListResDto,
  SubscribeListReqDto,
  SubscribeListResDto,
} from "./dto/show-subscribe.dto";

@Controller("admin")
@ApiTags("admin-subscribe")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  // TODO :: role 이 안먹힘 확인해서 수정하기
  @Post("delete-subscribe")
  @Roles(ManagerType.MANAGER)
  @ApiCreatedResponse({ type: DeleteSubscribeResDto })
  deleteSubscribe(@Body() body: DeleteSubscribeReqDto) {
    return this.subscribeService.delete(body);
  }

  @Post("/subscribe-list")
  @ApiCreatedResponse({ type: SubscribeListResDto })
  subscribeList(@Body() body: SubscribeListReqDto) {
    return this.subscribeService.list(body);
  }

  @Post("/subscribe-history-list")
  @ApiCreatedResponse({ type: SubscribeHistoryListResDto })
  subscribeHistoryList(@Body() body: SubscribeHistoryListReqDto) {
    return this.subscribeService.historyList(body);
  }
}
