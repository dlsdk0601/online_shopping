import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ManagerType } from "../../../entities/manager.entity";

export class EditManagerReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "비밀번호", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "이메일", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "타입", nullable: false, enum: ManagerType })
  @IsNotEmpty()
  @IsEnum(ManagerType)
  type: ManagerType;
}

export class EditManagerResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
