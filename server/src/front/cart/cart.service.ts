import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { CartListReqDto } from "./dto/show-cart.dto";
import { User } from "../../entities/user.entity";
import errorMessage from "../../config/errorMessage";

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
}
