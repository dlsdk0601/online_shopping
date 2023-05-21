import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GoogleTokenVerifyReqDto {
  @ApiProperty({ description: "token", type: "string" })
  @IsNotEmpty()
  @IsString()
  token: string;
}


export class GoogleTokenVerifyResDto {
  @ApiProperty({ description: "유저 가입 여부", type: "string" })
  @IsNotEmpty()
  @IsBoolean()
  isSignUp: boolean;

  @ApiProperty({ description: "회원가입된 유저가 사용할 token", type: "string" })
  @IsOptional()
  @IsString()
  token: string | null;

  @ApiProperty({ description: "연락처", nullable: false, type: "string" })
  @IsEmail()
  @IsOptional()
  email: string | null;
}
