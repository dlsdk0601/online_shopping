import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCartReqDto {
  @ApiProperty({
    description: "장바구니 삭제 pk 리스트",
    nullable: false,
    isArray: true,
    type: () => "number",
  })
  @IsArray()
  @IsNotEmpty()
  cartProductPks: number[];
}

export class DeleteCartResDto {
  @ApiProperty({ description: "장바구니 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
