import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

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

export class ShowCartReqDto {
  @ApiProperty({ description: "장바구니 상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class CartProductListItem {
  @ApiProperty({ description: "장바구니 상품 pk", nullable: false, type: "number" })
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

  @ApiProperty({ description: "상품 수량", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    description: "상품 메인 이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;
}

@ApiExtraModels(CartProductListItem)
export class ShowCartResDto {
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

  @ApiProperty({ description: "장바구니 총 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    description: "장바구니 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(CartProductListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  list: CartProductListItem[];
}
