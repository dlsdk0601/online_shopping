import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";
import { PurchaseItemStatus, PurchaseSearchType } from "../../../type/commonType";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class PurchaseListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @ApiProperty({ description: "검색 타입", nullable: true, type: "enum", enum: PurchaseSearchType })
  @IsOptional()
  @IsEnum(PurchaseSearchType)
  searchType: PurchaseSearchType | null;

  @ApiProperty({ description: "search", nullable: false, type: "string" })
  @IsEmpty()
  @IsString()
  search: string;
}

export class PurchaseListResPurchaseDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "유저 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "유저 연락처", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: "결제 금액", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ description: "주문 번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({ description: "결제 수단", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ description: "생성 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  createAt: Date;
}

@ApiExtraModels(PurchaseListResPurchaseDto)
export class PurchaseListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(PurchaseListResPurchaseDto) },
  })
  @IsArray()
  rows: PurchaseListResPurchaseDto[];

  constructor(data: PurchaseListResPurchaseDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}

export class ShowPurchaseReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class PurchaseItem {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "상품 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "상품 가격", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: "상품 갯수", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({
    description: "이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;

  @ApiProperty({
    description: "구매 상태",
    nullable: false,
    type: "enum",
    enum: PurchaseItemStatus,
  })
  @IsNotEmpty()
  @IsEnum(PurchaseItemStatus)
  status: PurchaseItemStatus;
}

@ApiExtraModels(PurchaseItem)
export class ShowPurchaseResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "유저 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "유저 연락처", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: "주문 번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({
    description: "상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(PurchaseItem) },
  })
  @IsNotEmpty()
  @IsArray()
  purchaseItems: PurchaseItem[];

  @ApiProperty({ description: "생성 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  createAt: Date;
}
