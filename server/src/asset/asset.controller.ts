import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AssetService } from "./asset.service";
import { UploadReqDto, UploadResDto, UploadsReqDto, UploadsResDto } from "./dto/upload.dto";

@Controller("asset")
@ApiTags("파일 업로드")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post("/upload")
  @ApiCreatedResponse({ type: UploadResDto, description: "파일 업로드" })
  async upload(@Body() body: UploadReqDto) {
    const fileSet = await this.assetService.uploadService(body);
    return { fileSet };
  }

  @Post("/uploads")
  @ApiCreatedResponse({ type: UploadsResDto })
  async uploads(@Body() body: UploadsReqDto) {
    return this.assetService.uploadsService(body.files);
  }

  @Get("/:uuid/:fileName")
  async getThumbnail(
    @Param("uuid") uuid: string,
    @Param("fileName") fileName: string,
    @Res() res: Response
  ) {
    const uuidPath = await this.assetService.findByUuid(uuid, fileName);
    return res.sendFile(uuidPath);
  }
}
