import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { CartListReqDto } from "./dto/show-cart.dto";
import { User } from "../../entities/user.entity";
import errorMessage from "../../config/errorMessage";

@Injectable()
export class CartService {
  constructor(private assetService: AssetService) {}

  async list(body: CartListReqDto, pk: number) {
    const userEntity = await User.findOne({
      where: {
        pk,
      },
      relations: {
        cart: {
          cart_products: {
            product: {
              main_image: true,
            },
          },
        },
      },
    });

    if (isNil(userEntity)) {
      throw new BadRequestException(errorMessage.BAD_REQUEST);
    }

    if (userEntity.cart.length > 1) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    const cartEntity = userEntity.cart[0];

    return {
      list: cartEntity.cart_products.map((cart) => ({
        pk: cart.pk,
        name: cart.product.name,
        price: cart.product.price,
        count: cart.count,
        image: cart.product.main_image,
      })),
    };
  }
}
