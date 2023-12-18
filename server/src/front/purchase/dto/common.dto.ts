import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { TossPaymentCardAcquireStatus } from "../../../type/type";
import {
  VirtualAccountRefundStatus,
  VirtualAccountSettlementStatus,
} from "../../../type/commonType";

export class TossPaymentErrorDto {
  @ApiProperty({ type: "string", nullable: false, description: "에러코드" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ type: "string", nullable: false, description: "에러 메세" })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class TossPaymentCardDto {
  @ApiProperty({
    type: "number",
    nullable: false,
    description: "결제 금액(즉시 할인 금액(discount.amount)이 포함)",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: "string", nullable: false, description: "카드사 코드" })
  @IsString()
  @IsNotEmpty()
  issuerCode: string;

  @ApiProperty({ type: "string", nullable: true, description: "카드 매입사 숫자 코드" })
  @IsString()
  @IsOptional()
  acquirerCode: string | null;

  @ApiProperty({ type: "string", nullable: false, description: "카드번호" })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ type: "number", nullable: false, description: "할부 개월 수" })
  @IsNumber()
  @IsNotEmpty()
  installmentPlanMonths: number;

  @ApiProperty({ type: "string", nullable: false, description: "카드사 승인 번호" })
  @IsString()
  @IsNotEmpty()
  approveNo: string;

  @ApiProperty({ type: "boolean", nullable: false, description: "카드사 포인트 사용 여부" })
  @IsBoolean()
  @IsNotEmpty()
  useCardPoint: boolean;

  @ApiProperty({ type: "string", nullable: false, description: "카드 종류" })
  @IsString()
  @IsNotEmpty()
  cardType: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "카드의 소유자 타입(개인, 법인, 미확인 중 하나",
  })
  @IsString()
  @IsNotEmpty()
  ownerType: string;

  @ApiProperty({
    type: "enum",
    enum: TossPaymentCardAcquireStatus,
    nullable: false,
    description: "카드 결제의 매입 상태",
  })
  @IsEnum(TossPaymentCardAcquireStatus)
  @IsNotEmpty()
  acquireStatus: TossPaymentCardAcquireStatus;

  @ApiProperty({ type: "boolean", nullable: false, description: "무이자 할부의 적용 여부" })
  @IsBoolean()
  @IsNotEmpty()
  isInterestFree: boolean;

  @ApiProperty({
    type: "string",
    nullable: true,
    description: "할부가 적용된 결제에서 할부 수수료를 부담하는 주체",
  })
  @IsString()
  @IsOptional()
  interestPayer: string | null;
  /*
  할부가 적용된 결제에서 할부 수수료를 부담하는 주체입니다. BUYER, CARD_COMPANY, MERCHANT 중 하나입니다.
  - BUYER: 상품을 구매한 고객이 할부 수수료를 부담합니다. 일반적인 할부 결제입니다.
  - CARD_COMPANY: 카드사에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
  - MERCHANT: 상점에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
   */
}

export class TossPaymentVirtualAccountDto {
  @ApiProperty({
    type: "string",
    nullable: false,
    description: "가상계좌 타입(일반, 고정 중 하나)",
  })
  @IsString()
  @IsNotEmpty()
  accountType: string;

  @ApiProperty({ type: "string", nullable: false, description: "발급된 계좌번호" })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ type: "string", nullable: false, description: "가상계좌 은행 숫자 코드" })
  @IsString()
  @IsNotEmpty()
  bankCode: string;

  @ApiProperty({ type: "string", nullable: false, description: "가상계좌를 발급한 고객 이름" })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ type: "date", nullable: false, description: "입금 기한" })
  @IsISO8601()
  @IsNotEmpty()
  dueDate: Date;
  // yyyy-MM-dd'T'HH:mm:ss ISO 8601 형식을 사용합니다.

  @ApiProperty({
    type: "enum",
    enum: VirtualAccountRefundStatus,
    nullable: false,
    description: "환불 처리 상태",
  })
  @IsEnum(VirtualAccountRefundStatus)
  @IsNotEmpty()
  refundStatus: VirtualAccountRefundStatus;

  @ApiProperty({ type: "boolean", nullable: false, description: "가상계좌가 만료되었는지 여부" })
  @IsBoolean()
  @IsNotEmpty()
  expired: boolean;

  @ApiProperty({
    type: "enum",
    enum: VirtualAccountSettlementStatus,
    nullable: false,
    description: "정산 상태",
  })
  @IsEnum(VirtualAccountSettlementStatus)
  @IsNotEmpty()
  settlementStatus: VirtualAccountSettlementStatus;

  // * 구매자의 환불계좌 정보는 결제창을 띄운 시점부터 30분 동안만 조회할 수 있습니다. 이후에는 값이 내려가지 않습니다.
  // 환불계좌 정보입니다. 은행 코드(bankCode), 계좌번호(accountNumber), 예금주 정보(holderName)가 담긴 객체입니다.
  refundReceiveAccount: {
    bankCode: string;
    accountNumber: string;
    holderName: string;
  };
}

export class TossPaymentCashReceiptDto {
  @ApiProperty({ type: "string", nullable: false, description: "현금영수증의 종류" })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: "string", nullable: false, description: "현금영수증의 키" })
  @IsString()
  @IsNotEmpty()
  receiptKey: string;

  @ApiProperty({ type: "string", nullable: false, description: "현금영수증 발급 번호" })
  @IsString()
  @IsNotEmpty()
  issueNumber: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "발행된 현금영수증을 확인할 수 있는 주소",
  })
  @IsString()
  @IsNotEmpty()
  receiptUrl: string;

  @ApiProperty({ type: "number", nullable: false, description: "현금영수증 처리된 금액" })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: "number", nullable: false, description: "면세 처리된 금액" })
  @IsNumber()
  @IsNotEmpty()
  taxFreeAmount: number;
}

@ApiExtraModels(TossPaymentErrorDto)
export class TossPaymentCashReceiptsDto extends TossPaymentCashReceiptDto {
  @ApiProperty({
    type: "string",
    nullable: false,
    description: "주문 ID",
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "주문명",
  })
  @IsString()
  @IsNotEmpty()
  orderName: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "현금영수증을 발급한 사업자등록번호",
  })
  @IsString()
  @IsNotEmpty()
  businessNumber: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "현금영수증 발급 종류",
  })
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "현금영수증 발급 상태",
  })
  @IsString()
  @IsNotEmpty()
  issueStatus: string;
  // IN_PROGRESS, COMPLETED, FAILED 중 하나입니다. 각 상태의 자세한 설명은 CashReceipt 객체에서 확인할 수 있습니다.

  @ApiProperty({
    nullable: false,
    description: "결제 실패 객체",
    items: { $ref: getSchemaPath(TossPaymentErrorDto) },
  })
  @IsString()
  @IsNotEmpty()
  failure: TossPaymentErrorDto;

  @ApiProperty({
    type: "string",
    nullable: false,
    description: "현금영수증 발급에 필요한 소비자 인증수단",
  })
  @IsString()
  @IsNotEmpty()
  customerIdentityNumber: string;

  @ApiProperty({
    type: "date",
    nullable: false,
    description: "결제가 일어난 날짜와 시간",
  })
  @IsISO8601()
  @IsNotEmpty()
  requestedAt: Date;
}

export class TossPaymentCancelDto {
  @ApiProperty({ type: "number", nullable: false, description: "결제를 취소한 금액" })
  @IsNumber()
  @IsNotEmpty()
  cancelAmount: number;

  @ApiProperty({ type: "string", nullable: false, description: "결제를 취소한 이유" })
  @IsString()
  @IsNotEmpty()
  cancelReason: string;

  @ApiProperty({ type: "number", nullable: false, description: "취소된 금액 중 면세 금액" })
  @IsNumber()
  @IsNotEmpty()
  taxFreeAmount: number;

  @ApiProperty({
    type: "number",
    nullable: false,
    description: "취소된 금액 중 과세 제외 금액(컵 보증금 등)",
  })
  @IsNumber()
  @IsNotEmpty()
  taxExemptionAmount: number;

  @ApiProperty({ type: "number", nullable: false, description: "결제 취소 후 환불 가능한 잔액" })
  @IsNumber()
  @IsNotEmpty()
  refundableAmount: number;

  @ApiProperty({
    type: "number",
    nullable: false,
    description: "간편결제 서비스의 포인트, 쿠폰, 즉시할인과 같은 적립식 결제수단에서 취소된 금액",
  })
  @IsNumber()
  @IsNotEmpty()
  easyPayDiscountAmount: number;

  @ApiProperty({
    type: "date",
    nullable: false,
    description: "결제 취소가 일어난 날짜와 시간 정보",
  })
  @IsISO8601()
  @IsNotEmpty()
  canceledAt: Date;

  @ApiProperty({ type: "string", nullable: false, description: "취소 건의 키 값" })
  @IsString()
  @IsNotEmpty()
  transactionKey: string;

  @ApiProperty({ type: "string", nullable: true, description: "취소 건의 현금영수증 키 값" })
  @IsString()
  @IsOptional()
  receiptKey: string | null;
}

export class TossPaymentEasyPayDto {
  @ApiProperty({ type: "string", nullable: false, description: "선택한 간편결제사 코드" })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({
    type: "number",
    nullable: false,
    description: "간편결제 서비스에 등록된 계좌 혹은 현금성 포인트로 결제한 금액",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: "number",
    nullable: false,
    description: "간편결제 서비스의 적립 포인트나 쿠폰 등으로 즉시 할인된 금액",
  })
  @IsNumber()
  @IsNotEmpty()
  discountAmount: number;
}
