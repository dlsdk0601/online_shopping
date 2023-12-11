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
import { PurchaseSearchType } from "../../../type/commonType";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class RefundListReqDto {
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

export class RefundListResRefundDto {
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

  @ApiProperty({ description: "환불 금액", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  cancelPrice: number;

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

  @ApiProperty({ description: "환불 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  canceledAt: Date;
}

@ApiExtraModels(RefundListResRefundDto)
export class RefundListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(RefundListResRefundDto) },
  })
  @IsArray()
  rows: RefundListResRefundDto[];

  constructor(data: RefundListResRefundDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}

export class ShowRefundReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class RefundItem {
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
}

@ApiExtraModels(RefundItem)
export class ShowRefundResDto {
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
    items: { $ref: getSchemaPath(RefundItem) },
  })
  @IsNotEmpty()
  @IsArray()
  purchaseItems: RefundItem[];

  @ApiProperty({ description: "생성 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  createAt: Date;

  @ApiProperty({ description: "환불 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  canceledAt: Date;
}
