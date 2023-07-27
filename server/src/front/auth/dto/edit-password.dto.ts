import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditPasswordReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "비밀번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EditPasswordResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
