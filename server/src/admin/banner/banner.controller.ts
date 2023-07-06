import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { BannerService } from "./banner.service";
import {
  BannerListReqDto,
  BannerListResDto,
  ShowBannerReqDto,
  ShowBannerResDto,
} from "./dto/show-banner.dto";
import { EditBannerReqDto, EditBannerResDto } from "./dto/edit-banner.dto";

@Controller("admin")
@ApiTags("admin-banner")
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post("banner-list")
  @ApiCreatedResponse({ type: BannerListResDto })
  async list(@Body() body: BannerListReqDto) {
    return this.bannerService.list();
  }

  @Post("show-banner")
  @ApiCreatedResponse({ type: ShowBannerResDto })
  async show(@Body() body: ShowBannerReqDto) {
    return this.bannerService.show(body.pk);
  }

  @Post("edit-banner")
  @ApiCreatedResponse({ type: EditBannerResDto })
  async edit(@Body() body: EditBannerReqDto) {
    return this.bannerService.edit(body);
  }
}
