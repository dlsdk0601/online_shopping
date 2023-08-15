import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ManagerType } from "../../../entities/manager.entity";

export class AddManagerReqDto {
  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "비밀번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "이메일", nullable: false, type: "string" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "타입", nullable: false, type: "enum", enum: ManagerType })
  @IsNotEmpty()
  @IsEnum(ManagerType)
  type: ManagerType;
}

export class AddManagerResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
