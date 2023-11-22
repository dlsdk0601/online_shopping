import { Injectable, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { ProductListReqDto, ProductListResDto } from "./dto/show-product.dto";
import { Product } from "../../entities/product.entity";
import errorMessage from "../../constant/errorMessage";

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

  async show(pk: number) {
    const product = await Product.findOne({ where: { pk }, relations: { sub_images: true } });

    if (isNil(product)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: product.pk,
      name: product.name,
      price: product.price,
      stockCount: product.stock_count,
      category: product.category,
      subImages: product.sub_images.map((img) => this.assetService.getFileSet(img)),
      descriptionTitle: product.description_title,
      description: product.description,
    };
  }
}
