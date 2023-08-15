import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GoogleTokenVerifyReqDto {
  @ApiProperty({ description: "token", type: "string", nullable: false })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class GoogleTokenVerifyResDto {
  @ApiProperty({ description: "유저 가입 여부", type: "string", nullable: false })
  @IsNotEmpty()
  @IsBoolean()
  isSignUp: boolean;

  @ApiProperty({ description: "회원가입된 유저가 사용할 token", type: "string", nullable: true })
  @IsOptional()
  @IsString()
  token: string | null;

  @ApiProperty({ description: "연락처", nullable: true, type: "string" })
  @IsEmail()
  @IsOptional()
  email: string | null;
}
