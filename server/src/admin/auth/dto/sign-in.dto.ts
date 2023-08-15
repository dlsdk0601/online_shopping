import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInReqDto {
  @ApiProperty({ description: "아이디", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "패스워드", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResDto {
  @ApiProperty({ description: "토큰", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  token: string;
}
