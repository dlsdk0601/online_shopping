import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { SubscribeService } from "./subscribe.service";
import { ManagerType } from "../../type/type";
import { DeleteSubscribeReqDto, DeleteSubscribeResDto } from "./dto/delete-subscribe.dto";
import { Roles } from "../../decorator/roles.decorator";
import {
  ShowSubscribeHistoryReqDto,
  ShowSubscribeHistoryResDto,
  SubscribeHistoryListReqDto,
  SubscribeHistoryListResDto,
  SubscribeListReqDto,
  SubscribeListResDto,
} from "./dto/show-subscribe.dto";
import { SelectSubscribeReqDto, SelectSubscribeResDto } from "./dto/select-subscribe.dto";
import {
  AddSubscribeHistoryReqDto,
  AddSubscribeHistoryResDto,
} from "./dto/add-subscribe-history.dto";
import {
  DeleteSubscribeHistoryReqDto,
  DeleteSubscribeHistoryResDto,
} from "./dto/delete-subscribe-history.dto";

@Controller("/admin/subscribe")
@ApiTags("admin-subscribe")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

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

  @Post("/show-subscribe-history")
  @ApiCreatedResponse({ type: ShowSubscribeHistoryResDto })
  subscribeHistoryShow(@Body() body: ShowSubscribeHistoryReqDto) {
    return this.subscribeService.historyShow(body);
  }

  @Post("select-subscribe")
  @ApiCreatedResponse({ type: SelectSubscribeResDto })
  async selectSubscribe(@Body() body: SelectSubscribeReqDto) {
    return this.subscribeService.selectSubscribes();
  }

  @Post("add-subscribe-history")
  @ApiCreatedResponse({ type: AddSubscribeHistoryResDto })
  async addSubscribeHistory(@Body() body: AddSubscribeHistoryReqDto) {
    return this.subscribeService.addSubscribeHistory(body);
  }

  @Post("delete-subscribe-history")
  @ApiCreatedResponse({ type: DeleteSubscribeHistoryResDto })
  async deleteSubscribeHistory(@Body() body: DeleteSubscribeHistoryReqDto) {
    return this.subscribeService.deleteSubscribeHistory(body);
  }
}
