import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { HomeReqDto } from "./dto/home.dto";
import { Product } from "../../entities/product.entity";
import { ProductCategory } from "../../type/commonType";

@Injectable()
export class HomeService {
  constructor(private assetService: AssetService) {}

  async home(body: HomeReqDto) {
    const productMens = await Product.find({
      where: {
        category: ProductCategory.MEN,
      },
      take: 3,
      order: {
        create_at: "asc",
      },
    });

    console.log(productMens);
  }
}
