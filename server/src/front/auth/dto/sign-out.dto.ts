import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class SignOutReqDto {}

export class SignOutResDto {
  @ApiProperty({ description: "로그아웃 결과", nullable: false, type: "boolean" })
  @IsBoolean()
  @IsNotEmpty()
  result: boolean;
}
