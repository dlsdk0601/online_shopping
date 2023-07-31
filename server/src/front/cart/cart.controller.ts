import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "./cart.service";
import { CartListReqDto, CartListResDto } from "./dto/show-cart.dto";
import { GetUser } from "../../decorator/user.decorator";
import { User } from "../../entities/user.entity";
import { EditCartProductCountReqDto, EditCartProductCountResDto } from "./dto/edit-cart.dto";

@Controller("/cart")
@ApiTags("장바구니")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("/cart-list")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: CartListResDto })
  list(@Body() body: CartListReqDto, @GetUser() user: User) {
    return this.cartService.list(body, user);
  }

  @Post("/edit-cart-product-count")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: EditCartProductCountResDto })
  editCartProductCount(@Body() body: EditCartProductCountReqDto) {
    return this.cartService.editCartProductCount(body);
  }
}
