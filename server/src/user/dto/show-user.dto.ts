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
import { UserSearchType, UserType } from "../../type/commonType";
import { PaginationDto } from "../../type/pagination.dto";

export class ShowUserReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}

export class ShowUserResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "phone" })
  @IsPhoneNumber()
  @IsOptional()
  phone: string | null;

  @ApiProperty({ description: "email" })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "create at" })
  create_at: Date;

  @ApiProperty({ description: "update at" })
  @IsOptional()
  update_at: Date | null;
}

export class UserListReqDto {
  @ApiProperty({ description: "page number" })
  @IsNumber()
  page: number;

  @ApiProperty({ description: "search type", enum: UserSearchType, nullable: true })
  @IsOptional()
  searchType: UserSearchType | null;

  @ApiProperty({ description: "search" })
  @IsString()
  search: string;
}

export class UserListResUserDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "phone" })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone: string | null;

  @ApiProperty({ description: "create at" })
  @IsDate()
  create_at: Date;

  @ApiProperty({ description: "가입 유형" })
  @IsEnum(UserType)
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
