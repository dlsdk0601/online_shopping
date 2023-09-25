import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TossPaymentType } from "../../../type/commonType";

export class TossPaymentApproveReqDto {
  @ApiProperty({ type: "string", nullable: false, description: "tosspay paymentKey" })
  @IsString()
  @IsNotEmpty()
  paymentKey: string;

  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({ type: "number", nullable: false, description: "결제 금액" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: "enum", enum: TossPaymentType, nullable: false, description: "결제 타입" })
  @IsEnum(TossPaymentType)
  @IsNotEmpty()
  paymentType: TossPaymentType;
}

export class TossPaymentApproveResDto {
  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제를 진행할 수 있는 토스페이 웹페이지 URL",
  })
  @IsString()
  @IsNotEmpty()
  checkoutPage: string;
}
