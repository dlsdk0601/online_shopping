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
import { PaginationDto } from "../../../type/pagination.dto";
import { PurchaseSearchType } from "../../../type/commonType";

export class FailListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @ApiProperty({ description: "검색 타입", nullable: true, type: "enum", enum: PurchaseSearchType })
  @IsOptional()
  @IsEnum(PurchaseSearchType)
  searchType: PurchaseSearchType | null;

  @ApiProperty({ description: "search", nullable: false, type: "string" })
  @IsString()
  search: string;
}

export class FailListResFailDto {
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

  @ApiProperty({ description: "에러 코드", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  errorCode: string;

  @ApiProperty({ description: "생성 일자", nullable: false, format: "date-time", type: "string" })
  @IsDate()
  @IsNotEmpty()
  createAt: Date;
}

@ApiExtraModels(FailListResFailDto)
export class FailListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(FailListResFailDto) },
  })
  @IsArray()
  rows: FailListResFailDto[];

  constructor(data: FailListResFailDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
