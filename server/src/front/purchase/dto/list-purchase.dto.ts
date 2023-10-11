import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";
import { TossPaymentStatus } from "../../../type/commonType";

export class PurchaseListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;
}

export class PurchaseListItem {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "주문 번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({ description: "결제 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "결제 유형", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ description: "결제 상태", enum: TossPaymentStatus, nullable: false, type: "enum" })
  @IsEnum(TossPaymentStatus)
  @IsNotEmpty()
  status: TossPaymentStatus;

  @ApiProperty({ type: "string", format: "date-time", nullable: false, description: "입금 기한" })
  @IsISO8601()
  @IsNotEmpty()
  createAt: string;
}

@ApiExtraModels(PurchaseListItem)
export class PurchaseListResDto extends PaginationDto {
  @ApiProperty({
    description: "상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(PurchaseListItem) },
  })
  @IsArray()
  @IsNotEmpty()
  rows: PurchaseListItem[];

  constructor(data: PurchaseListItem[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
