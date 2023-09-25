import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ShowPurchaseReqDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class ShowPurchaseResDto {
  @ApiProperty({ description: "구매 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ description: "구매 상품명", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;
}
