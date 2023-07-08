import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { FindOptionsWhere, Like } from "typeorm";
import { EditProductReqDto } from "./dto/edit-product.dto";
import { Product } from "../../entities/product.entity";
import { AssetService } from "../../asset/asset.service";
import { Asset } from "../../entities/asset.entity";
import errorMessage from "../../config/errorMessage";
import { ProductListReqDto, ProductListResDto, ShowProductReqDto } from "./dto/show-product.dto";
import { LIMIT } from "../../type/pagination.dto";
import { isNotNil } from "../../ex/ex";

@Injectable()
export class ProductService {
  constructor(private assetService: AssetService) {}

  async edit(body: EditProductReqDto) {
    let product: Product | null = new Product();

    if (isNotNil(body.pk)) {
      product = await Product.findOne({ where: { pk: body.pk } });
    }

    if (isNil(product)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

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
    let searchOption: FindOptionsWhere<Product> = { name: Like(`%${body.search}%`) };

    if (isNotNil(body.category)) {
      searchOption = {
        category: body.category,
        name: Like(`%${body.search}%`),
      };
    }
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
      where: searchOption,
    });

    return new ProductListResDto(products, count, body.page);
  }

  async show(body: ShowProductReqDto) {
    const product = await Product.findOne({
      where: { pk: body.pk },
      relations: { main_image: true, sub_images: true },
    });

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

  async delete(pk: number) {
    const product = await Product.findOne({ where: { pk } });

    if (isNil(product)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    try {
      await product.softRemove();
      return { pk: product.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
