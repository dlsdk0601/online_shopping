import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";
import { ProductCategory } from "../../../type/commonType";
import { ProductListItem } from "../../commonDto/ProductListItem.dto";

export class HomeReqDto {}

@ApiExtraModels(FileSetDto)
export class HomeBannerDto {
  @ApiProperty({
    description: "배너 이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;

  @ApiProperty({ description: "배너 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "배너 서브 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @ApiProperty({ description: "배너 설명", nullable: true, type: "string" })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({
    description: "배너 카테고리",
    nullable: true,
    type: "enum",
    enum: ProductCategory,
  })
  @IsEnum(ProductCategory)
  @IsOptional()
  category: ProductCategory | null;
}

@ApiExtraModels(HomeBannerDto)
export class BannerDto {
  @ApiProperty({
    description: "메인 베너 메인",
    nullable: false,
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsNotEmpty()
  mainBannerMain: HomeBannerDto;

  @ApiProperty({
    description: "메인 베너 여성",
    nullable: false,
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsNotEmpty()
  mainBannerWomen: HomeBannerDto;

  @ApiProperty({
    description: "메인 베너 남성",
    nullable: false,
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsNotEmpty()
  mainBannerMen: HomeBannerDto;

  @ApiProperty({
    description: "메인 베너 키즈",
    nullable: false,
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsNotEmpty()
  mainBannerKid: HomeBannerDto;

  @ApiProperty({
    description: "메인 베너 악세서리",
    nullable: false,
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsNotEmpty()
  mainBannerAccessory: HomeBannerDto;
}

@ApiExtraModels(HomeBannerDto, ProductListItem, BannerDto)
export class HomeResDto {
  @ApiProperty({
    description: "배너",
    nullable: false,
    items: { $ref: getSchemaPath(BannerDto) },
  })
  @IsNotEmpty()
  banner: BannerDto;

  @ApiProperty({
    description: "남성 최신 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ProductListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  mensLatestItems: ProductListItem[];

  @ApiProperty({
    description: "여성 최신 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ProductListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  womensLatestItems: ProductListItem[];

  @ApiProperty({
    description: "키즈 최신 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ProductListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  kidsLatestItems: ProductListItem[];
}
