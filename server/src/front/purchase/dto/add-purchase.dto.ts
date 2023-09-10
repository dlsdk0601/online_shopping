import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddPurchaseListDto {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "상품 수량", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

@ApiExtraModels(AddPurchaseListDto)
export class AddPurchaseReqDto {
  @ApiProperty({
    description: "구매할 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(AddPurchaseListDto) },
  })
  @IsArray()
  @IsNotEmpty()
  list: AddPurchaseListDto[];
}

export class AddPurchaseResDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
