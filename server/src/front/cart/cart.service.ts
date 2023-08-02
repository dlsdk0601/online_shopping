import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { CartListReqDto } from "./dto/show-cart.dto";
import { User } from "../../entities/user.entity";
import errorMessage from "../../config/errorMessage";
import { EditCartProductCountReqDto } from "./dto/edit-cart.dto";
import { CartProduct } from "../../entities/cart.entity";
import { DeleteCartItemReqDto } from "./dto/delete-cart.dto";

@Injectable()
export class CartService {
  constructor(private assetService: AssetService) {}

  list(body: CartListReqDto, user: User) {
    if (isNil(user.cart)) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    return {
      pk: user.cart.pk,
      list: user.cart.cart_products.map((cart) => ({
        pk: cart.pk,
        name: cart.product.name,
        price: cart.product.price,
        count: cart.count,
        image: cart.product.main_image,
      })),
    };
  }

  async editCartProductCount(body: EditCartProductCountReqDto) {
    const cartProduct = await CartProduct.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        product: { main_image: true },
      },
    });

    if (isNil(cartProduct)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    if (cartProduct.product.stock_count < body.count) {
      throw new BadRequestException(errorMessage.BAD_PRODUCT_COUNT);
    }

    cartProduct.count = body.count;

    try {
      await cartProduct.save();
      return {
        data: {
          pk: cartProduct.pk,
          name: cartProduct.product.name,
          price: cartProduct.product.price,
          count: cartProduct.count,
          image: cartProduct.product.main_image,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async deleteCartItem(body: DeleteCartItemReqDto, user: User) {
    const userCartProductPks = user.cart.cart_products.map((product) => product.pk);
    const isInclude = body.cartProductPks.every((pk) => userCartProductPks.includes(pk));

    if (!isInclude) {
      throw new BadRequestException(errorMessage.BAD_REQUEST);
    }

    const cartProduct = await CartProduct.find({
      where: body.cartProductPks.map((pk) => ({ pk })),
    });

    try {
      await CartProduct.remove(cartProduct);
      return { pk: user.cart.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
