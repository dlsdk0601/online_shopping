import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";

export class PurchaseListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "search", nullable: true, type: "string" })
  @IsOptional()
  @IsString()
  search: string | null;
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

  @ApiProperty({ description: "상품 개수", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;

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
