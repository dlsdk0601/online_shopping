import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import {
  CartListReqDto,
  CartListResDto,
  ShowCartReqDto,
  ShowCartResDto,
} from "./dto/show-cart.dto";

@Controller("/admin/cart")
@ApiTags("어드민 - 장바구니")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("cart-list")
  @ApiCreatedResponse({ type: CartListResDto })
  async list(@Body() body: CartListReqDto) {
    return this.cartService.list(body);
  }

  @Post("show-cart")
  @ApiCreatedResponse({ type: ShowCartResDto })
  async show(@Body() body: ShowCartReqDto) {
    return this.cartService.show(body);
  }
}
