import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AssetService } from "../../asset/asset.service";
import { MainBanner } from "../../entities/main-banner.entity";
import errorMessage from "../../config/errorMessage";
import { EditBannerReqDto } from "./dto/edit-banner.dto";
import { DeleteBannerReqDto } from "./dto/delete-banner.dto";

@Injectable()
export class BannerService {
  constructor(private readonly assetService: AssetService) {}

  async list() {
    const banners = await MainBanner.find({
      select: {
        pk: true,
        title: true,
        category: true,
        create_at: true,
      },
    });

    const list = banners.map((banner) => {
      return {
        pk: banner.pk,
        title: banner.title,
        category: banner.category,
        createAt: banner.create_at,
      };
    });

    return { list };
  }

  async show(pk: number) {
    const banner = await MainBanner.findOne({ where: { pk }, relations: { image: true } });

    if (isNil(banner)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: banner.pk,
      title: banner.title,
      description: banner.description,
      subTitle: banner.sub_title,
      category: banner.category,
      image: await this.assetService.fromUuid(banner.image.uuid),
    };
  }

  async edit(body: EditBannerReqDto) {
    let banner: MainBanner | null;

    if (isNil(body.pk)) {
      banner = new MainBanner();
    } else {
      banner = await MainBanner.findOne({ where: { pk: body.pk }, relations: { image: true } });
    }

    if (isNil(banner)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    banner.title = body.title;
    banner.sub_title = body.subTitle;
    banner.description = body.description;
    banner.category = body.category;
    banner.image = await this.assetService.fromUuid(body.image);

    try {
      await banner.save();
      return { pk: banner.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async delete(body: DeleteBannerReqDto) {
    const banner = await MainBanner.findOne({ where: { pk: body.pk } });

    if (isNil(banner)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    try {
      await banner.softRemove();
      return { pk: banner.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }
}
