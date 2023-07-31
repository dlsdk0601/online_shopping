import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { CartListItemDto } from "./show-cart.dto";

export class EditCartProductCountReqDto {
  @ApiProperty({ description: "장바구니 상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "상품 수량", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

@ApiExtraModels(CartListItemDto)
export class EditCartProductCountResDto {
  @ApiProperty({
    description: "장바구니 상품 데이터",
    nullable: false,
    items: { $ref: getSchemaPath(CartListItemDto) },
  })
  @IsArray()
  @IsNotEmpty()
  data: CartListItemDto;
}
