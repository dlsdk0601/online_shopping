import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { In } from "typeorm";
import { AssetService } from "../../asset/asset.service";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import errorMessage from "../../config/errorMessage";
import { AddPurchaseReqDto } from "./dto/add-purchase.dto";
import { isNotNil, makeOrderCode } from "../../ex/ex";
import { User } from "../../entities/user.entity";
import { PurchaseItemStatus } from "../../type/commonType";
import { CartProduct } from "../../entities/cart.entity";

@Injectable()
export class PurchaseService {
  constructor(private assetService: AssetService) {}

  async show(pk: number) {
    const purchase = await Purchase.findOne({
      where: { pk },
    });

    if (isNil(purchase)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    let totalPrice = 0;
    const list = purchase.purchase_items.map((item) => {
      totalPrice += item.product.price * item.count;

      return {
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        image: this.assetService.getFileSet(item.product.main_image),
      };
    });

    return {
      pk: purchase.pk,
      list,
      totalPrice,
    };
  }

  async add(body: AddPurchaseReqDto, user: User) {
    const purchase = new Purchase();
    purchase.order_code = makeOrderCode();
    purchase.user = user;

    const cartProducts: CartProduct[] = await CartProduct.find({
      where: {
        pk: In(body.pks),
      },
    });

    const purchaseItems: PurchaseItem[] = [];

    for (let i = 0; i < body.pks.length; i++) {
      const purchaseItem = new PurchaseItem();
      purchaseItem.status = PurchaseItemStatus.WAITING;

      const cartProduct = cartProducts.find((item) => item.pk === body.pks[i]);
      if (isNotNil(cartProduct)) {
        purchaseItem.product = cartProduct.product;
        purchaseItem.count = cartProduct.count;
      }

      purchaseItems.push(purchaseItem);
    }

    purchase.purchase_items = purchaseItems;

    try {
      await purchase.save();
      return { pk: purchase.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
