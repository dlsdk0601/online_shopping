import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NaverCodeVerifyReqDto {
  @ApiProperty({ description: "token", type: "string" })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: "state", type: "string" })
  @IsNotEmpty()
  @IsString()
  state: string;
}


export class NaverCodeVerifyResDto {
  @ApiProperty({ description: "회원가입된 유저가 사용할 token", type: "string" })
  @IsOptional()
  @IsString()
  token: string;
}
