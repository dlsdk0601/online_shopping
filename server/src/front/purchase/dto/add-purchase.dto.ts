import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddPurchaseReqDto {
  @ApiProperty({
    description: "구매할 장바구니 pk 리스트",
    nullable: false,
    type: "array",
    items: { type: "number" },
  })
  @IsArray()
  @IsNotEmpty()
  pks: number[];
}

export class AddPurchaseResDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
