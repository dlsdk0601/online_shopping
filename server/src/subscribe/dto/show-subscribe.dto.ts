import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SubscribeSearchType } from "../../type/commonType";
import { PaginationDto } from "../../type/pagination.dto";

export class SubScribeListReqDto {
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
