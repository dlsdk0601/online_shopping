import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserType } from "../../../type/commonType";

export class EditUserReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

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

  @ApiProperty({ description: "연락처", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: "연락처", nullable: false, type: "string" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "user type", enum: UserType, nullable: true })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ description: "비밀번호 업데이트 유무", nullable: true, type: "boolean" })
  @IsNotEmpty()
  @IsBoolean()
  isPasswordEdit: boolean;
}

export class EditUserResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
