import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Optional } from "@nestjs/common";

export class EditUserReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "email", nullable: true, type: "string" })
  @Optional()
  @IsEmail()
  email: string | null;

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
