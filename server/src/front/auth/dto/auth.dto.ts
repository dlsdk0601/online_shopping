import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class AuthReqDto {}

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
