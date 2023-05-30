import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditUserReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "uuid", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "email", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
}

export class EditUserResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
