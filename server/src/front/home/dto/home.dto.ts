import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";
import { ProductCategory } from "../../../type/commonType";

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

// TODO :: 나중에 상품 리스트 DTO 만들때 거기로 옮기기, 아니면 common 만들어서 옮기기
export class ProductListItem {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "상품 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "상품 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: "상품 카테고리",
    nullable: false,
    type: "enum",
    enum: ProductCategory,
  })
  @IsEnum(HomeBannerDto)
  @IsNotEmpty()
  category: ProductCategory;

  // TODO :: 별점 추가
}

@ApiExtraModels(HomeBannerDto, ProductListItem)
export class HomeResDto {
  @ApiProperty({
    description: "메인 베너",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(HomeBannerDto) },
  })
  @IsArray()
  @IsNotEmpty()
  mainBanners: HomeBannerDto[];

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
