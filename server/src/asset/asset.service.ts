import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { isNil } from "lodash";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { UploadReqDto } from "./dto/upload.dto";
import { Asset } from "../entities/asset.entity";
import errorMessage from "../constant/errorMessage";
import { FileSetDto } from "./dto/fileSet.dto";
import { config } from "../config";

@Injectable()
export class AssetService {
  private readonly s3: S3Client;
  private readonly S3_BUCKET_NAME: string;
  private readonly thumbnail_size: [number, number] = [150, 150];

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
      region: config.awsRegion,
    });
    this.S3_BUCKET_NAME = config.awsBucketName;
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

  async uploadsService(body: UploadReqDto[]) {
    const res = await Promise.all(body.map((file) => this.uploadService(file)));
    return { fileSets: res };
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
    return `https://${this.S3_BUCKET_NAME}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
  }

  thumbnailUrl(uuid: string, fileName: string) {
    return `${config.originUrl}${config.apiVersion}/asset/${uuid}/${fileName}`;
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
