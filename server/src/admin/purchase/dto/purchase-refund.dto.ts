import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RefundPurchaseReqDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "결제 취소 이유", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  cancelReason: string;
}

export class RefundPurchaseResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
