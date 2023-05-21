import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteUserReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}

export class DeleteUserResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
