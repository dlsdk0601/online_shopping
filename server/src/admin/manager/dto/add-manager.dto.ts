import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ManagerType } from "../../../entities/manager.entity";

export class AddManagerReqDto {
  @ApiProperty({ description: "uuid" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "password hash" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "password hash" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "password hash" })
  @IsEnum(ManagerType)
  type: ManagerType;
}

export class AddManagerResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
