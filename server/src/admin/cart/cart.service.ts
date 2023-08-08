import { Injectable, NotFoundException } from "@nestjs/common";
import { Like } from "typeorm";
import { isNil } from "lodash";
import { CartListReqDto, CartListResDto, ShowCartReqDto } from "./dto/show-cart.dto";
import { Cart } from "../../entities/cart.entity";
import { LIMIT } from "../../type/pagination.dto";
import errorMessage from "../../config/errorMessage";
import { AssetService } from "../../asset/asset.service";

@Injectable()
export class CartService {
  constructor(private assetService: AssetService) {}
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

  async show(body: ShowCartReqDto) {
    const cart = await Cart.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        user: true,
        cart_products: {
          product: {
            main_image: true,
          },
        },
      },
    });

    if (isNil(cart)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    let totalPrice = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const cartProduct of cart.cart_products) {
      totalPrice += cartProduct.count * cartProduct.product.price;
    }

    return {
      pk: cart.pk,
      name: cart.user.name,
      phone: cart.user.phone,
      totalPrice,
      list: cart.cart_products.map((product) => ({
        pk: product.pk,
        name: product.product.name,
        price: product.product.price,
        count: product.count,
        image: this.assetService.getFileSet(product.product.main_image),
      })),
    };
  }
}
