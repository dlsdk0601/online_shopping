import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NaverCodeVerifyReqDto {
  @ApiProperty({ description: "token", type: "string", nullable: false })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: "state", type: "string", nullable: false })
  @IsNotEmpty()
  @IsString()
  state: string;
}

export class NaverCodeVerifyResDto {
  @ApiProperty({ description: "회원가입된 유저가 사용할 token", type: "string", nullable: true })
  @IsOptional()
  @IsString()
  token: string | null;
}

export interface NaverCodeVerifyRes {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

export interface NaverGetUserDataResponse {
  id: string;
  nickname: string;
  name: string;
  email: string;
  gender: string; // - F: 여성,  M: 남성, U: 확인불가
  age: string;
  birthday: string; // 사용자 생일(MM-DD 형식)
  profile_image: string; // 사용자 프로필 사진 URL
  birthyear: string;
  mobile: string;
}

export interface NaverGetUserData {
  resultcode: string;
  message: string;
  response: NaverGetUserDataResponse;
}
