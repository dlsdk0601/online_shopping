import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInReqDto {
  @ApiProperty({ description: "id" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "password" })
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  @ApiProperty({ description: "token" })
  @IsNotEmpty()
  token: string;
}
