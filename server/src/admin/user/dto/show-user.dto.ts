import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { UserSearchType, UserType } from "../../../type/commonType";
import { PaginationDto } from "../../../type/pagination.dto";

export class ShowUserReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class ShowUserResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "type", nullable: false, enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @ApiProperty({ description: "phone", nullable: true, type: "string" })
  @IsPhoneNumber()
  @IsOptional()
  phone: string | null;

  @ApiProperty({ description: "email", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "create at", nullable: false })
  @IsNotEmpty()
  @IsDate()
  createAt: Date;

  @ApiProperty({ description: "update at", nullable: true, type: "string" })
  @IsOptional()
  @IsDate()
  updateAt: Date | null;

  @ApiProperty({ description: "상품 구매 횟수", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  buyCount: number;

  @ApiProperty({ description: "환불한 상품 갯수", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  refundCount: number;
}

export class UserListReqDto {
  @ApiProperty({ description: "page number", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "search type", enum: UserSearchType, nullable: true })
  @IsOptional()
  @IsEnum(UserSearchType)
  searchType: UserSearchType | null;

  @ApiProperty({ description: "search", nullable: false, type: "string" })
  @IsString()
  search: string;
}

export class UserListResUserDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "phone", nullable: true, type: "string" })
  @IsString()
  @IsOptional()
  phone: string | null;

  @ApiProperty({ description: "create at", nullable: false })
  @IsDate()
  @IsNotEmpty()
  create_at: Date;

  @ApiProperty({ description: "가입 유형", nullable: false, enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;
}

@ApiExtraModels(UserListResUserDto)
export class UserListResDto extends PaginationDto {
  @ApiProperty({
    description: "아이템",
    type: "array",
    items: { $ref: getSchemaPath(UserListResUserDto) },
  })
  @IsArray()
  rows: UserListResUserDto[];

  constructor(data: UserListResUserDto[], count: number, page: number) {
    super(count, page);
    this.rows = data;
  }
}
