import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PurchaseItemStatus } from "../../../type/commonType";
import { FileSetDto } from "../../../asset/dto/fileSet.dto";

export class ShowOrderReqDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

@ApiExtraModels(FileSetDto)
export class ShowOrderProductItem {
  @ApiProperty({ description: "상품 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "상품명", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "수량", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ description: "가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "상태", nullable: false, type: "enum", enum: PurchaseItemStatus })
  @IsEnum(PurchaseItemStatus)
  @IsNotEmpty()
  status: PurchaseItemStatus;

  @ApiProperty({
    description: "이미지",
    nullable: false,
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  @IsNotEmpty()
  image: FileSetDto;
}

@ApiExtraModels(ShowOrderProductItem)
export class ShowOrderResDto {
  @ApiProperty({ description: "구매 pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "구매 가격", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ description: "구매 상품명", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "주문 번호", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: "구매 상품 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ShowOrderProductItem) },
  })
  @IsArray()
  @IsNotEmpty()
  products: ShowOrderProductItem[];
}
