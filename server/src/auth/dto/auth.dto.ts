import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";
import { ManagerType } from "../../entities/manager.entity";

export class AuthReqDto {}

export class AuthManagerResDto {
  @ApiProperty({ description: "token" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "id" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "type" })
  @IsEnum(ManagerType)
  type: ManagerType;

  @ApiProperty({ description: "name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "email" })
  @IsEmail()
  email: string;
}

export class AuthUserResDto {
  @ApiProperty({ description: "token" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "id" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "phone" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: "email" })
  @IsEmail()
  email: string;
}
