import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { TossPaymentStatus, TossPaymentType } from "../../../type/commonType";
import {
  TossPaymentCancelDto,
  TossPaymentCardDto,
  TossPaymentCashReceiptDto,
  TossPaymentCashReceiptsDto,
  TossPaymentEasyPayDto,
  TossPaymentErrorDto,
  TossPaymentVirtualAccountDto,
} from "./common.dto";

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

@ApiExtraModels(TossPaymentErrorDto)
export class TossPaymentApproveResDto {
  @ApiProperty({
    type: "boolean",
    nullable: false,
    description: "결제 성공 여부",
  })
  @IsBoolean()
  @IsNotEmpty()
  result: boolean;

  @ApiProperty({ type: "number", nullable: false, description: "approvePk" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({
    type: TossPaymentErrorDto,
    nullable: true,
    description: "에러 코드",
    items: { $ref: getSchemaPath(TossPaymentErrorDto) },
  })
  error: TossPaymentErrorDto | null;
}

export class TossPaymentHttpApproveReqDto {
  @ApiProperty({
    type: "string",
    nullable: false,
    description: "tosspay paymentKey",
  })
  @IsString()
  @IsNotEmpty()
  paymentKey: string;

  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ type: "number", nullable: false, description: "결제 금액" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

@ApiExtraModels(
  TossPaymentCardDto,
  TossPaymentVirtualAccountDto,
  TossPaymentCancelDto,
  TossPaymentCashReceiptDto,
  TossPaymentCashReceiptsDto,
  TossPaymentEasyPayDto,
  TossPaymentErrorDto
)
export class TossPaymentHttpApproveResDto {
  @ApiProperty({ type: "string", nullable: false, description: "상점 코드" })
  @IsString()
  @IsNotEmpty()
  mId: string;

  @ApiProperty({ type: "string", nullable: false, description: "응답 객체 버전" })
  @IsString()
  @IsNotEmpty()
  version: string;

  @ApiProperty({ type: "string", nullable: false, description: "tosspay paymentKey" })
  @IsString()
  @IsNotEmpty()
  paymentKey: string;

  @ApiProperty({
    type: "enum",
    nullable: false,
    enum: TossPaymentStatus,
    description: "결제 처리 상태",
  })
  @IsEnum(TossPaymentStatus)
  @IsNotEmpty()
  status: TossPaymentStatus;

  @ApiProperty({ type: "string", nullable: true, description: "마지막 거래의 키 값" })
  @IsString()
  @IsOptional()
  lastTransactionKey: string | null;

  @ApiProperty({ type: "string", nullable: false, description: "주문 번호" })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ type: "string", nullable: false, description: "상품명" })
  @IsString()
  @IsNotEmpty()
  orderName: string;

  @ApiProperty({ type: "date", nullable: false, description: "결제가 일어난 날짜와 시간" })
  @IsISO8601()
  @IsNotEmpty()
  requestedAt: Date;

  @ApiProperty({ type: "date", nullable: false, description: "결제 승인이 일어난 날짜와 시간" })
  @IsISO8601()
  @IsNotEmpty()
  approvedAt: Date;

  @ApiProperty({ type: "boolean", nullable: false, description: "에스크로 사용 여부" })
  @IsBoolean()
  @IsNotEmpty()
  useEscrow: boolean;

  // 계좌이체, 가상계좌 결제에만 적용됩니다.
  // 카드 결제는 항상 false로 돌아옵니다. 카드 결제 문화비는 카드사에 문화비 소득공제 전용 가맹점번호로 등록하면 자동으로 처리됩니다.
  @ApiProperty({ type: "boolean", nullable: false, description: "문화비 지출 여부" })
  @IsBoolean()
  @IsNotEmpty()
  cultureExpense: boolean;

  @ApiProperty({
    nullable: true,
    description: "카드로 결제하면 제공되는 카드 관련 정보",
    items: { $ref: getSchemaPath(TossPaymentCardDto) },
  })
  @IsOptional()
  card: TossPaymentCardDto | null;

  @ApiProperty({
    nullable: true,
    description: "가상계좌로 결제하면 제공되는 가상계좌 관련 정보",
    items: { $ref: getSchemaPath(TossPaymentVirtualAccountDto) },
  })
  @IsOptional()
  virtualAccount: TossPaymentVirtualAccountDto | null;

  // 기획상 계좌 이체 결제는 진행 x.
  transfer: null;

  // 기획상 휴대폰 결제 결제는 진행 x.
  mobilePhone: null;

  // 기획상 상품권 결제 결제는 진행 x.
  giftCertificate: null;

  @ApiProperty({
    description: "현금영수증 정보",
    nullable: true,
    items: { $ref: getSchemaPath(TossPaymentCashReceiptDto) },
  })
  @IsOptional()
  cashReceipt: TossPaymentCashReceiptDto | null;

  @ApiProperty({
    type: "array",
    description: "현금영수증 정보",
    nullable: true,
    items: { $ref: getSchemaPath(TossPaymentCashReceiptsDto) },
  })
  @IsOptional()
  cashReceipts: TossPaymentCashReceiptsDto[] | null;

  @ApiProperty({ nullable: true, description: "카드사의 즉시 할인 프로모션 정보" })
  @IsObject()
  @IsNotEmpty()
  discount: { amount: number } | null;

  @ApiProperty({
    nullable: true,
    description: "결제 취소 이력이 담기는 배열",
    items: { $ref: getSchemaPath(TossPaymentCancelDto) },
  })
  @IsArray()
  @IsOptional()
  cancels: TossPaymentCancelDto[] | null;

  @ApiProperty({
    type: "string",
    nullable: true,
    description: "가상계좌 웹훅이 정상적인 요청인지 검증하는 값",
  })
  @IsString()
  @IsOptional()
  secret: string | null;

  @ApiProperty({
    type: "enum",
    enum: TossPaymentType,
    nullable: false,
    description: "결제 타입 정보",
  })
  @IsEnum(TossPaymentType)
  @IsNotEmpty()
  type: TossPaymentType;

  @ApiProperty({
    description: "간편결제 정보",
    nullable: true,
    items: { $ref: getSchemaPath(TossPaymentEasyPayDto) },
  })
  @IsOptional()
  easyPay: TossPaymentEasyPayDto | null;

  @ApiProperty({ type: "string", nullable: false, description: "결제한 국가" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: "결제 승인에 실패하면 응답",
    nullable: true,
    items: { $ref: getSchemaPath(TossPaymentErrorDto) },
  })
  @IsOptional()
  failure: TossPaymentErrorDto | null;

  @ApiProperty({ type: "boolean", nullable: false, description: "부분 취소 가능 여부" })
  @IsBoolean()
  @IsNotEmpty()
  isPartialCancelable: boolean;

  @ApiProperty({ nullable: false, description: "발행된 영수증 정보" })
  @IsObject()
  @IsNotEmpty()
  receipt: {
    url: string;
  };

  @ApiProperty({ nullable: false, description: "결제창 정보" })
  @IsObject()
  @IsNotEmpty()
  checkout: {
    url: string;
  };

  @ApiProperty({ type: "string", nullable: false, description: "결제할 때 사용한 통화" })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ type: "number", nullable: false, description: "총 결제 금액" })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ type: "number", nullable: false, description: "취소할 수 있는 금액(잔고)" })
  @IsNumber()
  @IsNotEmpty()
  balanceAmount: number;

  @ApiProperty({ type: "number", nullable: false, description: "공급가액" })
  @IsNumber()
  @IsNotEmpty()
  suppliedAmount: number;

  @ApiProperty({ type: "number", nullable: false, description: "부가세" })
  @IsNumber()
  @IsNotEmpty()
  vat: number;

  @ApiProperty({ type: "number", nullable: false, description: "결제 금액 중 면세 금액" })
  @IsNumber()
  @IsNotEmpty()
  taxFreeAmount: number;

  @ApiProperty({ type: "string", nullable: false, description: "결제 수단" })
  @IsString()
  @IsNotEmpty()
  method: string;
}

export class TossPaymentHttpCancelReqDto {
  @ApiProperty({ type: "string", nullable: false, description: "취소 사유" })
  @IsString()
  @IsNotEmpty()
  cancelReason: string;
}
