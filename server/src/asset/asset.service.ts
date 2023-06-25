import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";
import { isNil } from "lodash";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { UploadReqDto } from "./dto/upload.dto";
import { Asset } from "../entities/asset.entity";
import errorMessage from "../config/errorMessage";
import { FileSetDto } from "./dto/fileSet.dto";
import constant from "../config/constant";

@Injectable()
export class AssetService {
  private readonly s3: S3Client;
  private readonly S3_BUCKET_NAME: string;
  private readonly thumbnail_size: [number, number] = [150, 150];

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY") ?? "",
        secretAccessKey: this.configService.get<string>("AWS_SECRET_KEY") ?? "",
      },
      region: this.configService.get<string>("AWS_REGION") ?? "",
    });
    this.S3_BUCKET_NAME = this.configService.get<string>("AWS_BUCKET_NAME") ?? "";
  }

  async uploadService(body: UploadReqDto) {
    const command = new PutObjectCommand({
      Bucket: this.S3_BUCKET_NAME,
      Key: body.fileName,
      Body: this.base64ToBuffer(body.fileBase64),
      ContentType: "application/octet-stream",
    });

    try {
      await this.s3.send(command);
      const uuid = uuidv4().toString();

      const asset = new Asset();
      asset.content_type = body.type;
      asset.name = body.fileName;
      asset.uuid = uuid;
      asset.url = this.awsDownloadUrl(body.fileName);
      asset.download_url = this.awsDownloadUrl(body.fileName);

      await asset.save();

      return this.getFileSet(asset);
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.FILE_UPLOAD_FAILED);
    }
  }

  async findByUuid(uuid: string, name: string) {
    const thumbnail = await this.generateThumbnail(name);

    if (isNil(thumbnail)) {
      throw new InternalServerErrorException(errorMessage.FILE_NOT_FOUND);
    }

    fs.writeFileSync(this.getTempPath(uuid), thumbnail);

    return this.getTempPath(uuid);
  }

  getFileSet(asset: Asset): FileSetDto {
    return {
      url: asset.url,
      downloadUrl: asset.download_url,
      thumbnail: this.thumbnailUrl(asset.uuid, asset.name),
      uuid: asset.uuid,
      name: asset.name,
      contentType: asset.content_type,
    };
  }

  async generateThumbnail(fileName: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.S3_BUCKET_NAME,
      Key: fileName,
    });

    const { Body } = await this.s3.send(getObjectCommand);

    if (isNil(Body)) {
      return;
    }

    const chucks = await Body.transformToByteArray();

    return sharp(chucks).resize(this.thumbnail_size[0], this.thumbnail_size[1]).toBuffer();
  }

  base64ToBuffer(base64: string) {
    return Buffer.from(base64, "base64");
  }

  awsDownloadUrl(fileName: string) {
    const region = this.configService.get<string>("AWS_REGION") ?? "";
    return `https://${this.S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;
  }

  thumbnailUrl(uuid: string, fileName: string) {
    const origin = this.configService.get<string>("ORIGINURL") ?? "";
    return `${origin}${constant().ApiVersion}/asset/${uuid}/${fileName}`;
  }

  getTempPath(uuid: string) {
    return path.join(__dirname, "..", "..", "..", "src", "temp", uuid);
  }

  async fromUuid(uuid: string) {
    const asset = await Asset.findOne({ where: { uuid } });

    if (isNil(asset)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return asset;
  }
}
