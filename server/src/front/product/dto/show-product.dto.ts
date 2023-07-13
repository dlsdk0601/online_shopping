import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { toNumber } from "src/lib/dtoTransformEx";
import { ProductCategory } from "../../../type/commonType";
import { ProductListItem } from "../../commonDto/ProductListItem.dto";
import { PaginationDto } from "../../../type/pagination.dto";

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
