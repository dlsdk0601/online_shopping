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
import errorMessage from "../../constant/errorMessage";
import { EditCartProductCountReqDto } from "./dto/edit-cart.dto";
import { Cart, CartProduct } from "../../entities/cart.entity";
import { DeleteCartReqDto } from "./dto/delete-cart.dto";
import { AddCartReqDto } from "./dto/add-cart.dto";
import { Product } from "../../entities/product.entity";
import { isNotNil } from "../../ex/ex";

@Injectable()
export class CartService {
  constructor(private assetService: AssetService) {}

  async list(body: CartListReqDto, user: User) {
    const cart = await this.findOrCreateCart(user);

    return {
      pk: cart.pk,
      list: cart.cart_products.map((cartProduct) => ({
        pk: cartProduct.pk,
        name: cartProduct.product.name,
        price: cartProduct.product.price,
        count: cartProduct.count,
        image: cartProduct.product.main_image,
      })),
    };
  }

  async add(body: AddCartReqDto, user: User) {
    const product = await Product.findOne({ where: { pk: body.pk } });

    if (isNil(product)) {
      throw new BadRequestException(errorMessage.BAD_REQUEST);
    }

    const isExist = user.cart.cart_products.find((item) => item.product.pk === body.pk);
    if (isNotNil(isExist)) {
      throw new BadRequestException("장바구니에 이미 존재 합니다.");
    }

    const cart = await this.findOrCreateCart(user);
    const cartProduct = new CartProduct();
    cartProduct.product = product;
    cartProduct.count = 1;
    cartProduct.cart = cart;

    try {
      await cartProduct.save();
      return { pk: cartProduct.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
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

  async deleteCartItem(body: DeleteCartReqDto, user: User) {
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

  async findOrCreateCart(user: User) {
    if (isNil(user.cart)) {
      // 첫 회원 가입한 유저는 장바구니가 없으니 만들어 준다.
      const newCart = new Cart();
      newCart.user = user;
      try {
        await newCart.save();
        return newCart;
      } catch (e) {
        throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
      }
    }

    return user.cart;
  }
}
