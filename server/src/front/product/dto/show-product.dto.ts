import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { toNumber } from "src/lib/dtoTransformEx";
import { ProductCategory } from "../../../type/commonType";
import { ProductListItem } from "../../commonDto/ProductListItem.dto";
import { PaginationDto } from "../../../type/pagination.dto";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class ProductListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @Transform(({ value }: { value: string }) => toNumber(value, { default: 1 }))
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "상품 카테고리", enum: ProductCategory, nullable: false })
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;
}

@ApiExtraModels(ProductListItem)
export class ProductListResDto extends PaginationDto {
  @ApiProperty({
    description: "상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ProductListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  rows: ProductListItem[];

  constructor(data: ProductListItem[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}

export class ShowProductReqDto {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class ShowProductResDto {
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

  @ApiProperty({ description: "상품 재고", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  stockCount: number;

  @ApiProperty({
    description: "상품 카테고리",
    nullable: false,
    type: "enum",
    enum: ProductCategory,
  })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({
    description: "상품 메인 이미지",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  subImages: FileSetDto[];

  @ApiProperty({ description: "상품 설명 타이틀", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  descriptionTitle: string;

  @ApiProperty({ description: "상품 설명", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
