import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCartItemReqDto {
  @ApiProperty({
    description: "장바구니 삭제 pk 리스트",
    nullable: false,
    type: "array",
    items: { $ref: "number" },
  })
  @IsArray()
  @IsNotEmpty()
  cartProductPks: number[];
}

export class DeleteCartItemResDto {
  @ApiProperty({ description: "장바구니 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
