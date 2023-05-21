import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddUserReqDto {

  @ApiProperty({ description: "id" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ description: "name" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: "password" })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ description: "phone" })
  phone: string;

  @ApiProperty({ description: "email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AddUserResDto {
  @IsNumber()
  @ApiProperty({ description: "pk" })
  pk: number;
}
