import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteSubscribeReqDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}

export class DeleteSubscribeResDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
