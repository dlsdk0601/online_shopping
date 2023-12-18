import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FailPurchaseReqDto {
  @ApiProperty({ type: "string", nullable: false, description: "에러 코드" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ type: "string", nullable: false, description: "에러 메세지" })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;
}

export class FailPurchaseResDto {
  @ApiProperty({ type: "number", nullable: false, description: "pk" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ type: "string", nullable: false, description: "에러 메세지" })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: "string", nullable: false, description: "에러 코드" })
  @IsString()
  @IsNotEmpty()
  errorCode: string;

  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;
}
