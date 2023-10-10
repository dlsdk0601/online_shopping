import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";

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
