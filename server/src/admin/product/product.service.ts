import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AddProductReqDto } from "./dto/add-product.dto";
import { Product } from "../../entities/product.entity";
import { AssetService } from "../../asset/asset.service";
import { Asset } from "../../entities/asset.entity";
import errorMessage from "../../config/errorMessage";
import { ProductListReqDto, ProductListResDto, ShowProductReqDto } from "./dto/show-product.dto";
import { LIMIT } from "../../type/pagination.dto";

@Injectable()
export class ProductService {
  constructor(private assetService: AssetService) {}

  async add(body: AddProductReqDto) {
    const product = new Product();
    product.name = body.name;
    product.description_title = body.descriptionTitle;
    product.description = body.description;
    product.price = body.price;
    product.stock_count = body.stockCount;
    product.category = body.category;
    const mainImage = await this.assetService.fromUuid(body.mainImage);
    const subImages: Asset[] = [];
    for (let i = 0; i < body.subImages.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const asset = await this.assetService.fromUuid(body.subImages[i]);
      subImages.push(asset);
    }
    product.main_image = mainImage;
    product.sub_images = subImages;

    try {
      await product.save();
      return { pk: product.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async list(body: ProductListReqDto) {
    const [products, count] = await Product.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      select: {
        pk: true,
        name: true,
        price: true,
        category: true,
        create_at: true,
      },
    });

    return new ProductListResDto(products, count, body.page);
  }

  async show(body: ShowProductReqDto) {
    const product = await Product.findOne({ where: { pk: body.pk } });

    if (isNil(product)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: product.pk,
      name: product.name,
      descriptionTitle: product.description_title,
      description: product.description,
      price: product.price,
      mainImage: this.assetService.getFileSet(product.main_image),
      subImages: product.sub_images.map((image) => this.assetService.getFileSet(image)),
      stockCount: product.stock_count,
      category: product.category,
    };
  }

  edit(id: number) {
    return `This action returns a #${id} product`;
  }

  delete(id: number) {
    return `This action removes a #${id} product`;
  }
}
