import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaginationDto } from "../../../type/pagination.dto";
import { ManagerType } from "../../../entities/manager.entity";

export class ShowManagerReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}

export class ShowManagerResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "이메일", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "타입", nullable: false, type: "enum", enum: ManagerType })
  @IsNotEmpty()
  @IsEnum(ManagerType)
  type: ManagerType;
}

export class ManagerListReqDto {
  @ApiProperty({ description: "페이지", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  page: number;
}

export class ManagerListResManagerDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "생성 일자", type: "string", format: "date-time" })
  @IsNotEmpty()
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
