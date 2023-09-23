import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

export class HttpKakaoCodeVerifyReqDto {
  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  grant_type: string;

  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  redirect_uri: string;

  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class HtttpKakaoCodeVerifyResDto {
  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  token_type: string;

  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  id_token?: string;

  @ApiProperty({ type: "number", nullable: true })
  @IsNotEmpty()
  @IsNumber()
  expires_in: number;

  @ApiProperty({ type: "string", nullable: true })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;

  @ApiProperty({ type: "number", nullable: true })
  @IsNotEmpty()
  @IsNumber()
  refresh_token_expires_in: number;

  @ApiProperty({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  scope?: string;
}

export interface KakaoAccount {
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  profile_image_needs_agreement?: boolean;
  profile?: {
    nickname: string;
    thumbnail_image_url: string;
    profile_image_url: string;
    is_default_image: string;
  };
  name_needs_agreement?: boolean;
  name?: string;
  email_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  email?: string;
  age_range_needs_agreement?: boolean;
  age_range?: string;
  birthyear_needs_agreement?: boolean;
  birthyear?: string;
  birthday_needs_agreement?: boolean;
  birthday?: string;
  birthday_type?: string;
  gender_needs_agreement?: boolean;
  gender?: string;
  phone_number_needs_agreement?: boolean;
  phone_number?: string;
  ci_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: Date;
}

export interface Partner {
  uuid: string; // 고유 ID
}

export interface KakaoGetUserRes {
  id: number;
  has_signed_up?: boolean;
  connected_at?: Date;
  synched_at?: Date;
  properties?: JSON;
  kakao_account?: KakaoAccount;
  for_partner?: Partner;
}
