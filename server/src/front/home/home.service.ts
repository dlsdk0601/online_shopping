import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { HomeReqDto } from "./dto/home.dto";
import { Product } from "../../entities/product.entity";
import { ProductCategory } from "../../type/commonType";

@Injectable()
export class HomeService {
  constructor(private assetService: AssetService) {}

  async home(body: HomeReqDto) {
    const productMens = await this.prodictList(ProductCategory.MEN, 6);
    const productWomens = await this.prodictList(ProductCategory.WOMEN, 6);
    const productKids = await this.prodictList(ProductCategory.KIDS, 6);

    return {
      mainBanners: [],
      mensLatestItems: productMens,
      womensLatestItems: productWomens,
      kidsLatestItems: productKids,
    };
  }

  async prodictList(category: ProductCategory, limit: number) {
    return Product.find({
      where: { category },
      take: limit,
      order: { create_at: "desc" },
      select: {
        pk: true,
        name: true,
        price: true,
        category: true,
      },
    });
  }
}
