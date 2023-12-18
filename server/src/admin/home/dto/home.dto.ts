import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class HomeReqDto {}

export class HomeResDto {
  @ApiProperty({ type: "number", nullable: false, description: "회원가입 비율" })
  @IsNumber()
  @IsNotEmpty()
  newUserRate: number;

  @ApiProperty({ type: "number", nullable: false, description: "회원가입 수" })
  @IsNumber()
  @IsNotEmpty()
  newUserCount: number;

  @ApiProperty({ type: "number", nullable: false, description: "판매 비율" })
  @IsNumber()
  @IsNotEmpty()
  newSaleRate: number;

  @ApiProperty({ type: "number", nullable: false, description: "판매 수" })
  @IsNumber()
  @IsNotEmpty()
  newSalesCount: number;

  @ApiProperty({ type: "number", nullable: false, description: "구독자 수" })
  @IsNumber()
  @IsNotEmpty()
  newSubscribeCount: number;

  @ApiProperty({ type: "number", nullable: false, description: "구독자 비율" })
  @IsNumber()
  @IsNotEmpty()
  newSubscribeRate: number;

  @ApiProperty({ type: "number", nullable: false, description: "호나불 수" })
  @IsNumber()
  @IsNotEmpty()
  newRefundCount: number;

  @ApiProperty({ type: "number", nullable: false, description: "환불 비율" })
  @IsNumber()
  @IsNotEmpty()
  newRefundRate: number;
}
