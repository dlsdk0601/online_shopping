import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { ProductListReqDto, ProductListResDto } from "./dto/show-product.dto";
import { Product } from "../../entities/product.entity";

@Injectable()
export class ProductService {
  LIMIT = 9; // front 리스트는 limit 가 9개 라서 여기만 상수를 따로 정의
  constructor(private assetService: AssetService) {}

  async list(query: ProductListReqDto) {
    const [products, count] = await Product.findAndCount({
      take: this.LIMIT,
      skip: this.LIMIT * (query.page - 1),
      relations: { main_image: true },
      where: {
        category: query.category,
      },
      select: {
        pk: true,
        name: true,
        price: true,
        category: true,
      },
    });

    const productListItems = products.map((product) => ({
      ...product,
      image: this.assetService.getFileSet(product.main_image),
    }));

    return new ProductListResDto(productListItems, count, query.page);
  }
}
