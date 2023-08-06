import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";
import { CartListReqDto, CartListResDto } from "./dto/show-cart.dto";
import { Cart } from "../../entities/cart.entity";
import { LIMIT } from "../../type/pagination.dto";

@Injectable()
export class CartService {
  async list(body: CartListReqDto) {
    const [carts, count] = await Cart.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      select: {
        pk: true,
      },
      relations: {
        user: true,
        cart_products: true,
      },
      where: {
        user: {
          name: Like(`%${body.search}%`),
        },
      },
    });

    const cartList = carts.map((cart) => ({
      pk: cart.pk,
      name: cart.user.name,
      phone: cart.user.phone,
      count: cart.cart_products.length,
    }));

    return new CartListResDto(cartList, count, body.page);
  }
}
