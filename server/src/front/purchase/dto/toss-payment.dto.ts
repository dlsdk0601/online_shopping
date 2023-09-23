import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTossPayPurchaseReqDto {
  @ApiProperty({ type: "number", nullable: false, description: "purchase pk" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ type: "string", nullable: false, description: "상품 설명" })
  @IsString()
  @IsNotEmpty()
  productDesc: string;

  @ApiProperty({ type: "number", nullable: false, description: "결제 금액" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class AddTossPayPurchaseResDto {
  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제를 진행할 수 있는 토스페이 웹페이지 URL",
  })
  @IsString()
  @IsNotEmpty()
  checkoutPage: string;
}

export class makeTossPayPurchaseReqDto {
  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderNo: string;

  @ApiProperty({ type: "number", nullable: false, description: "결제 금액" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: "number", nullable: false, description: "비과세 금액" })
  @IsNumber()
  @IsNotEmpty()
  amountTaxFree: number;

  @ApiProperty({ type: "string", nullable: false, description: "상품 설명" })
  @IsString()
  @IsNotEmpty()
  productDesc: string;

  @ApiProperty({ type: "string", nullable: false, description: "API KEY" })
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({ type: "boolean", nullable: false, description: "자동 승인 설정 여부" })
  @IsBoolean()
  @IsNotEmpty()
  autoExecute: boolean;

  @ApiProperty({ type: "string", nullable: false, description: "API version" })
  @IsString()
  @IsNotEmpty()
  callbackVersion: "V2";

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제 결과 callback 웹 URL (필수-자동승인설정 true의 경우)",
  })
  @IsString()
  @IsNotEmpty()
  resultCallback: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제 완료 후 연결할 웹 URL (필수)",
  })
  @IsString()
  @IsNotEmpty()
  retUrl: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제 취소 시 연결할 웹 URL (필수)",
  })
  @IsString()
  @IsNotEmpty()
  retCancelUrl: string;
}

export class makeTossPayPurchaseResDto {
  @ApiProperty({
    type: "number",
    nullable: false,
    description: "응답코드",
  })
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "결제를 진행할 수 있는 토스페이 웹페이지 URL",
  })
  @IsString()
  @IsNotEmpty()
  checkoutPage?: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "유니크한 토큰 값",
  })
  @IsString()
  @IsNotEmpty()
  payToken?: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "응답이 성공이 아닌 경우 설명 메세지",
  })
  @IsString()
  @IsNotEmpty()
  msg: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "에러 코드",
  })
  @IsString()
  @IsNotEmpty()
  errorCode: string;
}
