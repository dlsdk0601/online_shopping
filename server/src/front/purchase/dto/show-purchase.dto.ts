import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class ShowPurchaseReqDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class PurchaseListItemDto {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "상품 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "상품 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "상품 수량", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    description: "상품 메인 이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;
}

@ApiExtraModels(PurchaseListItemDto)
export class ShowPurchaseResDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({
    description: "구매 물품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(PurchaseListItemDto) },
  })
  @IsArray()
  @IsNotEmpty()
  list: PurchaseListItemDto[];

  @ApiProperty({ description: "구매 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
