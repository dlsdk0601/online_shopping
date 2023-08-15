import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class KakaoCodeVerifyReqDto {
  @ApiProperty({ description: "token", type: "string", nullable: false })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class KakaoCodeVerifyResDto {
  @ApiProperty({ description: "유저 가입 여부", type: "string", nullable: false })
  @IsNotEmpty()
  @IsBoolean()
  isSignUp: boolean;

  @ApiProperty({ description: "회원가입된 유저가 사용할 token", type: "string", nullable: true })
  @IsOptional()
  @IsString()
  token: string | null;

  @ApiProperty({ description: "이메일", nullable: false, type: "string" })
  @IsEmail()
  @IsOptional()
  email: string | null;
}
