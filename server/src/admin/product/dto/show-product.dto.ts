import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ProductCategory } from "../../../type/commonType";
import { PaginationDto } from "../../../type/pagination.dto";

export class ProductListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "category type", enum: ProductCategory, nullable: true })
  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory | null;

  @ApiProperty({ description: "search", nullable: true, type: "string" })
  @IsOptional()
  @IsString()
  search: string;
}

export class ProductListResProductDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "상품 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "카테고리", nullable: false, enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({ description: "create at", nullable: false, type: "date", format: "date-time" })
  @IsDate()
  @IsNotEmpty()
  create_at: Date;
}

@ApiExtraModels(ProductListResProductDto)
export class ProductListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(ProductListResProductDto) },
  })
  @IsArray()
  rows: ProductListResProductDto[];

  constructor(data: ProductListResProductDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
