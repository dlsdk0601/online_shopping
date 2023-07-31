import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "./cart.service";
import { CartListReqDto, CartListResDto } from "./dto/show-cart.dto";
import { GetUser } from "../../decorator/user.decorator";
import { User } from "../../entities/user.entity";

@Controller("/cart")
@ApiTags("장바구니")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("/cart-list")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: CartListResDto })
  async list(@Body() body: CartListReqDto, @GetUser() user: User) {
    return this.cartService.list(body, user);
  }
}
