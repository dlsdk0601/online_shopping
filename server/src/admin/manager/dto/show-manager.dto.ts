import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";
import { ManagerType } from "../../../entities/manager.entity";

export class ShowManagerReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}

export class ShowManagerResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "uuid" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "password hash" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "password hash" })
  @IsEnum(ManagerType)
  type = ManagerType;
}

export class ManagerListReqDto {
  @ApiProperty({ description: "페이지" })
  @IsNumber()
  page: number;
}

export class ManagerListResManagerDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "id" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "create at", type: "date", format: "date-time" })
  @IsDate()
  create_at: Date;
}

@ApiExtraModels(ManagerListResManagerDto)
export class ManagerListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(ManagerListResManagerDto) },
  })
  @IsArray()
  rows: ManagerListResManagerDto[];

  constructor(data: ManagerListResManagerDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
