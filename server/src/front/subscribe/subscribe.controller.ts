import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { SubscribeService } from "./subscribe.service";
import { GetUser } from "../../decorator/user.decorator";
import { User } from "../../entities/user.entity";
import { AddSubscribeReqDto, AddSubscribeResDto } from "./dto/add-subscribe.dto";

@Controller("subscribe")
@ApiTags("subscribe")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post("/add-subscribe")
  @ApiCreatedResponse({ type: AddSubscribeResDto })
  @UseGuards(AuthGuard("jwt"))
  addSubscribe(@Body() body: AddSubscribeReqDto, @GetUser() user: User) {
    return this.subscribeService.create(body, user);
  }
}
