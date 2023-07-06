import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Optional } from "@nestjs/common";
import { ProductCategory } from "../../../type/commonType";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class BannerListReqDto {}

export class BannerListResBannerDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "배너 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "카테고리", nullable: false, enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({ description: "생성 일자", nullable: false, type: "string", format: "date-time" })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  createAt: Date;
}

@ApiExtraModels(BannerListResBannerDto)
export class BannerListResDto {
  @ApiProperty({
    description: "리스트",
    type: "array",
    items: { $ref: getSchemaPath(BannerListResBannerDto) },
  })
  list: BannerListResBannerDto[];
}

export class ShowBannerReqDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class ShowBannerResDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "배너 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "배너 설명", nullable: true, type: "string" })
  @IsString()
  @Optional()
  description: string | null;

  @ApiProperty({ description: "배너 서브 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @ApiProperty({ description: "카테고리", nullable: false, enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({
    description: "이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;
}
