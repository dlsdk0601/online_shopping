import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteManagerReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}

export class DeleteManagerResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
