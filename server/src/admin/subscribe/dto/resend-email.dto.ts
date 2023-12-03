import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class ResendEmailReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class ResendEmailResDto {
  @ApiProperty({ description: "결과", nullable: false, type: "boolean" })
  @IsBoolean()
  @IsNotEmpty()
  result: boolean;
}
