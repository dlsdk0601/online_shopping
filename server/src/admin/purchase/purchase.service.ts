import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { PurchaseListReqDto, PurchaseListResDto } from "./dto/show-purchase.dto";
import { Purchase } from "../../entities/Purchase.entity";
import { LIMIT } from "../../type/pagination.dto";

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
      createAt: item.create_at,
    }));

    return new PurchaseListResDto(items, count, body.page);
  }
}
