import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserType } from "../../../type/commonType";

export class SignUpReqDto {
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
}

export class SignUpResDto {
  @ApiProperty({ description: "토큰", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class SnsSignUpReqDto {
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

  @ApiProperty({
    description: "가입 타입",
    nullable: false,
    enum: [UserType.GOOGLE, UserType.LOCAL, UserType.APPLE, UserType.KAKAO, UserType.NAVER],
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}

export class SnsSignUpResDto {
  @ApiProperty({ description: "토큰", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  token: string;
}
