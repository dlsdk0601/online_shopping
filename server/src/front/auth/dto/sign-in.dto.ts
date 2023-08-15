import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInReqDto {
  @ApiProperty({ description: "id", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "password", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResDto {
  @ApiProperty({ description: "token", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  token: string;
}
