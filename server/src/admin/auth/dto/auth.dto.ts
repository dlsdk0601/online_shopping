import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ManagerType } from "../../../entities/manager.entity";

export class AuthReqDto {}

export class AuthManagerResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "타입", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsEnum(ManagerType)
  type: ManagerType;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "이메일", nullable: false, type: "string" })
  @IsEmail()
  @IsString()
  email: string;
}
