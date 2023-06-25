import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AddProductReqDto } from "./dto/add-product.dto";
import { Product } from "../../entities/product.entity";
import { AssetService } from "../../asset/asset.service";
import { Asset } from "../../entities/asset.entity";
import errorMessage from "../../config/errorMessage";

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

  list() {
    return `This action returns all product`;
  }

  edit(id: number) {
    return `This action returns a #${id} product`;
  }

  delete(id: number) {
    return `This action removes a #${id} product`;
  }
}
