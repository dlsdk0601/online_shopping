import { Injectable, NotFoundException } from "@nestjs/common";
import { isEmpty, isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { HomeReqDto } from "./dto/home.dto";
import { Product } from "../../entities/product.entity";
import { ProductCategory } from "../../type/commonType";
import { MainBanner } from "../../entities/main-banner.entity";
import errorMessage from "../../constant/errorMessage";

@Injectable()
export class HomeService {
  constructor(private assetService: AssetService) {}

  async home(body: HomeReqDto) {
    const productMens = await this.productList(ProductCategory.MEN, 6);
    const productWomens = await this.productList(ProductCategory.WOMEN, 6);
    const productKids = await this.productList(ProductCategory.KIDS, 6);
    const mainBannerMain = await this.getBanner(ProductCategory.WOMEN);
    const mainBannerWomen = await this.getBanner(ProductCategory.WOMEN);
    const mainBannerMen = await this.getBanner(ProductCategory.MEN);
    const mainBannerKid = await this.getBanner(ProductCategory.KIDS);
    const mainBannerAccessory = await this.getBanner(ProductCategory.ACCESSORY);

    return {
      banner: {
        mainBannerMain,
        mainBannerWomen,
        mainBannerMen,
        mainBannerKid,
        mainBannerAccessory,
      },
      mensLatestItems: productMens,
      womensLatestItems: productWomens,
      kidsLatestItems: productKids,
    };
  }

  // TODO :: 배너 타입 따로 만들기
  async getBanner(category: ProductCategory) {
    // findOne 으로 찾으면 고유 값인 pk 가 없다고 에러가 난다.
    // TODO :: category 를 유니크 값으로 걸어보기
    const banners = await MainBanner.find({
      where: { category },
      relations: { image: true },
      select: {
        title: true,
        sub_title: true,
        description: true,
        category: true,
      },
    });

    if (isNil(banners) || isEmpty(banners)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      title: banners[0].title,
      subTitle: banners[0].sub_title,
      description: banners[0].description,
      category: banners[0].category,
      image: this.assetService.getFileSet(banners[0].image),
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
