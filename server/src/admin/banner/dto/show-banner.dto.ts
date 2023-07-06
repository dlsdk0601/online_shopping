import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "../../../type/commonType";

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

// @ApiProperty({ description: "배너 설명", nullable: true, type: "string" })
// @IsString()
// @Optional()
// description: string;

// @ApiProperty({ description: "배너 서브 제목", nullable: false, type: "string" })
// @IsString()
// @IsNotEmpty()
// subTitle: string;
