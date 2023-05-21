import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EditUserReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "uuid" })
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ description: "email" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: "name" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: "password" })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ description: "phone" })
  phone: string;
}

export class EditUserResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
