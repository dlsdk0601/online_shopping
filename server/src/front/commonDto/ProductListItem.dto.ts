import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FileSetDto } from "../../asset/dto/fileSet.dto";
import { ProductCategory } from "../../type/commonType";

@ApiExtraModels(FileSetDto)
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
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({
    description: "상품 메인 이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;
}
