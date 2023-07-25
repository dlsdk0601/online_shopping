import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { UserType } from "../../../type/commonType";

export class AuthReqDto {}

export class AuthUserResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "id", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "user type", enum: UserType, nullable: true })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "phone", nullable: false, type: "string" })
  @IsPhoneNumber()
  @IsString()
  phone: string;

  @ApiProperty({ description: "email", nullable: false, type: "string" })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ description: "createAt", type: "string", format: "date-time" })
  @IsEmail()
  @IsString()
  createAt: string;
}
