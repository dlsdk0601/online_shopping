import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SubscribeHistorySearchType, SubscribeSearchType } from "../../../type/commonType";
import { PaginationDto } from "../../../type/pagination.dto";

export class SubscribeListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "search type", enum: SubscribeSearchType, nullable: true })
  @IsOptional()
  @IsEnum(SubscribeSearchType)
  searchType: SubscribeSearchType | null;

  @ApiProperty({ description: "search", nullable: true, type: "string" })
  @IsOptional()
  @IsString()
  search: string;
}

export class SubscribeListResSubscribeDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "email", nullable: false, type: "string" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "create at", nullable: false })
  @IsDate()
  @IsNotEmpty()
  create_at: Date;
}

@ApiExtraModels(SubscribeListResSubscribeDto)
export class SubscribeListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(SubscribeListResSubscribeDto) },
  })
  @IsArray()
  rows: SubscribeListResSubscribeDto[];

  constructor(data: SubscribeListResSubscribeDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}

export class SubscribeHistoryListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "search type", enum: SubscribeHistorySearchType, nullable: true })
  @IsOptional()
  @IsEnum(SubscribeHistorySearchType)
  searchType: SubscribeHistorySearchType | null;

  @ApiProperty({ description: "search", nullable: true, type: "string" })
  @IsOptional()
  @IsString()
  search: string;
}

export class SubscribeHistoryListResSubscribeHistoryDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "발송 시간", nullable: false, type: "string" })
  @IsDate()
  @IsNotEmpty()
  send_time: Date;

  @ApiProperty({ description: "발송 여부", nullable: false, type: "boolean" })
  @IsBoolean()
  @IsNotEmpty()
  is_send: boolean;
}

@ApiExtraModels(SubscribeHistoryListResSubscribeHistoryDto)
export class SubscribeHistoryListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(SubscribeHistoryListResSubscribeHistoryDto) },
  })
  @IsArray()
  rows: SubscribeHistoryListResSubscribeHistoryDto[];

  constructor(data: SubscribeHistoryListResSubscribeHistoryDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
