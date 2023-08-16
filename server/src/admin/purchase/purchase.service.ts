import { Injectable, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import {
  PurchaseListReqDto,
  PurchaseListResDto,
  ShowPurchaseReqDto,
} from "./dto/show-purchase.dto";
import { Purchase } from "../../entities/Purchase.entity";
import { LIMIT } from "../../type/pagination.dto";
import errorMessage from "../../config/errorMessage";

@Injectable()
export class PurchaseService {
  constructor(private assetService: AssetService) {}

  async list(body: PurchaseListReqDto) {
    const [purchases, count] = await Purchase.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        user: true,
        purchase_items: true,
      },
    });

    const items = purchases.map((item) => ({
      pk: item.pk,
      name: item.user.name,
      phone: item.user.phone ?? "",
      count: item.purchase_items.length,
      orderCode: item.order_code,
      createAt: item.create_at,
    }));

    return new PurchaseListResDto(items, count, body.page);
  }

  async show(body: ShowPurchaseReqDto) {
    const purchase = await Purchase.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        purchase_items: true,
        user: true,
      },
    });

    if (isNil(purchase)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: purchase.pk,
      name: purchase.user.name,
      phone: purchase.user.phone ?? "",
      orderCode: purchase.order_code,
      createAt: purchase.create_at,
      purchaseItems: purchase.purchase_items.map((item) => ({
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        status: item.status,
      })),
    };
  }
}
