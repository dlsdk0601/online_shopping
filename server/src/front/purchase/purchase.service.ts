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
import { Product } from "../../entities/product.entity";

@Injectable()
export class PurchaseService {
  constructor(private assetService: AssetService) {}

  async show(pk: number) {
    const purchase = await Purchase.findOne({
      where: { pk },
      relations: {
        purchase_items: {
          product: {
            main_image: true,
          },
        },
      },
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
        image: item.product.main_image,
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

    const products: Product[] = await Product.find({
      where: {
        pk: In(body.list.map((item) => item.pk)),
      },
    });

    const purchaseItems: PurchaseItem[] = [];

    for (let i = 0; i < body.list.length; i++) {
      const purchaseItem = new PurchaseItem();
      purchaseItem.status = PurchaseItemStatus.WAITING;

      const product = products.find((item) => item.pk === body.list[i].pk);
      if (isNotNil(product)) {
        purchaseItem.product = product;
      }

      purchaseItems.push(purchaseItem);
    }

    purchase.purchase_items = purchaseItems;

    try {
      await purchase.save();
      return { pk: purchase.purchase_items };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
