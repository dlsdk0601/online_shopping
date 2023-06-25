import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { ProductCategory } from "../../../type/commonType";

export class AddProductReqDto {
  @ApiProperty({ description: "상품 이름", type: "string", nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "상품 설명 타이틀", type: "string", nullable: false })
  @IsString()
  @IsNotEmpty()
  descriptionTitle: string;

  @ApiProperty({ description: "상품 설명", type: "string", nullable: false })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: "상품 가격", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "상품 메인 이미지", type: "string", nullable: false })
  @IsUUID()
  @IsNotEmpty()
  mainImage: string;

  @ApiProperty({
    description: "상품 서브 이미지 리스트",
    type: "array",
    nullable: false,
    items: { type: "string" },
  })
  @IsArray()
  @IsNotEmpty()
  subImages: string[];

  @ApiProperty({ description: "상품 재고", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  stockCount: number;

  @ApiProperty({
    description: "상품 카테고리",
    type: "enum",
    nullable: false,
    enum: ProductCategory,
  })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;
}

export class AddProductResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
