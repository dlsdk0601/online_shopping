import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { OrderListReqDto, OrderListResDto } from "./dto/list-purchase.dto";
import { ShowOrderReqDto, ShowOrderResDto } from "../purchase/dto/show-order.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("order-list")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: OrderListResDto })
  list(@Body() body: OrderListReqDto) {
    return this.orderService.list(body);
  }

  @Post("show-order")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: ShowOrderResDto })
  async showOrder(@Body() body: ShowOrderReqDto) {
    return this.orderService.show(body);
  }
}
