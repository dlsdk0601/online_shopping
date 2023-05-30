import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddUserReqDto {
  @ApiProperty({ description: "id", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "name", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "password", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: "phone", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: "email", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AddUserResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
