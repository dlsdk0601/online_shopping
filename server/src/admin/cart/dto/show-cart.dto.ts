import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";

export class CartListReqDto {
  @ApiProperty({ description: "페이지", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "검색어", nullable: false, type: "string" })
  @IsString()
  @IsOptional()
  search: string;
}

export class CartListItemDto {
  @ApiProperty({ description: "장바구니 상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "유저 네임", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "유저 핸드폰 번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  phone: string | null;

  @ApiProperty({ description: "상품 총 갯수", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

@ApiExtraModels(CartListItemDto)
export class CartListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(CartListItemDto) },
  })
  @IsArray()
  rows: CartListItemDto[];

  constructor(data: CartListItemDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
