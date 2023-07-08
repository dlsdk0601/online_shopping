import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteProductReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class DeleteProductResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
