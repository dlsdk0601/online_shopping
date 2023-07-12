import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { HomeReqDto } from "./dto/home.dto";
import { Product } from "../../entities/product.entity";
import { ProductCategory } from "../../type/commonType";

@Injectable()
export class HomeService {
  constructor(private assetService: AssetService) {}

  async home(body: HomeReqDto) {
    const productMens = await this.productList(ProductCategory.MEN, 6);
    const productWomens = await this.productList(ProductCategory.WOMEN, 6);
    const productKids = await this.productList(ProductCategory.KIDS, 6);

    return {
      mainBanners: [],
      mensLatestItems: productMens,
      womensLatestItems: productWomens,
      kidsLatestItems: productKids,
    };
  }

  async productList(category: ProductCategory, limit: number) {
    const products = await Product.find({
      where: { category },
      take: limit,
      relations: { main_image: true },
      select: {
        pk: true,
        name: true,
        price: true,
        category: true,
      },
    });

    return products.map((product) => {
      return {
        ...product,
        image: this.assetService.getFileSet(product.main_image),
      };
    });
  }
}
