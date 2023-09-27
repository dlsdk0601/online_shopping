import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TimeSet from "./timeSet.entity";
import { TossPaymentStatus, TossPaymentType } from "../type/commonType";
import { TossPaymentCardAcquireStatus } from "../type/type";
import { Payment } from "./payment.entity";

@Entity("toss_payment_approve")
export class TossPaymentApprove extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @OneToOne(() => Payment, { nullable: false })
  @JoinColumn({ name: "payment_pk", referencedColumnName: "pk" })
  payment: Payment;

  @Column({ type: "varchar", nullable: false, length: 16, comment: "상점 코드" })
  mid: string;

  @Column({ type: "varchar", nullable: false, length: 16, comment: "상점 코드" })
  version: string;

  @Column({ type: "varchar", nullable: false, length: 256, comment: "tosspay paymentKey" })
  payment_key: string;

  @Column({ type: "enum", nullable: false, enum: TossPaymentStatus, comment: "결제 처리 상태" })
  status: TossPaymentStatus;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
    length: 64,
    comment: "마지막 거래의 키 값",
  })
  last_transaction_key: string;

  @Column({ type: "varchar", nullable: false, length: 64, comment: "주문 번호" })
  order_id: string;

  @Column({ type: "varchar", nullable: false, length: 128, comment: "상품명" })
  order_name: string;

  @Column({ type: "timestamptz", nullable: false, comment: "결제가 일어난 날짜와 시간" })
  requested_at: Date;

  @Column({ type: "date", nullable: false, comment: "결제 승인이 일어난 날짜와 시간" })
  approvedAt: Date;

  @Column({ type: "boolean", nullable: false, comment: "에스크로 사용 여부" })
  use_escrow: boolean;

  // 계좌이체, 가상계좌 결제에만 적용됩니다.
  // 카드 결제는 항상 false로 돌아옵니다. 카드 결제 문화비는 카드사에 문화비 소득공제 전용 가맹점번호로 등록하면 자동으로 처리됩니다.
  @Column({ type: "boolean", nullable: false, comment: "문화비 지출 여부" })
  culture_expense: boolean;

  @Column({ type: "int", nullable: true, comment: "카드사의 즉시 할인 프로모션 정보" })
  discount: number | null;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
    length: 64,
    comment: "가상계좌 웹훅이 정상적인 요청인지 검증하는 값",
  })
  secret: string;

  @Column({ type: "enum", enum: TossPaymentType, nullable: false, comment: "결제 타입 정보" })
  type: TossPaymentType;

  @Column({ type: "varchar", nullable: false, length: 8, comment: "결제한 국가" })
  country: string;

  @Column({ type: "boolean", nullable: false, comment: "부분 취소 가능 여부" })
  is_partial_cancelable: boolean;

  @Column({ type: "varchar", nullable: false, length: 256, comment: "발행된 영수증 정보" })
  receipt: string;

  @Column({ type: "varchar", nullable: false, length: 256, comment: "결제창 정보" })
  checkout: string;

  @Column({ type: "varchar", nullable: false, length: 16, comment: "결제할 때 사용한 통화" })
  currency: string;

  @Column({ type: "int", nullable: false, comment: "총 결제 금액" })
  total_amount: number;

  @Column({ type: "int", nullable: false, comment: "취소할 수 있는 금액(잔고)" })
  balance_amount: number;

  @Column({ type: "int", nullable: false, comment: "공급가액" })
  supplied_amount: number;

  @Column({ type: "int", nullable: false, comment: "부가세" })
  vat: number;

  @Column({ type: "int", nullable: false, comment: "결제 금액 중 면세 금액" })
  tax_free_amount: number;

  @Column({ type: "varchar", nullable: false, length: 16, comment: "결제 수단" })
  method: string;
}

@Entity("toss_payment_approve_card")
export class TossPaymentApproveCard extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @OneToOne(() => TossPaymentApprove, { nullable: false })
  @JoinColumn({ name: "toss_payment_approve_pk", referencedColumnName: "pk" })
  toss_payment_approve: TossPaymentApprove;

  @Column({
    type: "int",
    nullable: false,
    comment: "결제 금액(즉시 할인 금액(discount.amount)이 포함)",
  })
  amount: number;

  @Column({ type: "varchar", nullable: false, length: 8, comment: "카드사 코드" })
  issuer_code: string;

  @Column({
    type: "varchar",
    nullable: true,
    default: "",
    length: 8,
    comment: "카드 매입사 숫자 코드",
  })
  acquirer_code: string;

  @Column({ type: "varchar", nullable: false, length: 32, comment: "카드번호" })
  number: string;

  @Column({ type: "int", nullable: false, comment: "할부 개월 수" })
  installment_plan_months: number;

  @Column({ type: "varchar", nullable: false, length: 8, comment: "카드사 승인 번호" })
  approve_no: string;

  @Column({ type: "boolean", nullable: false, comment: "카드사 포인트 사용 여부" })
  use_card_point: boolean;

  @Column({ type: "varchar", nullable: false, length: 32, comment: "카드 종류" })
  card_type: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 32,
    comment: "카드의 소유자 타입(개인, 법인, 미확인 중 하나",
  })
  owner_type: string;

  @Column({
    type: "enum",
    enum: TossPaymentCardAcquireStatus,
    nullable: false,
    comment: "카드 결제의 매입 상태",
  })
  acquire_status: TossPaymentCardAcquireStatus;

  @Column({ type: "boolean", nullable: false, comment: "무이자 할부의 적용 여부" })
  is_interest_free: boolean;

  @Column({
    type: "varchar",
    nullable: true,
    default: "",
    length: 16,
    comment: "할부가 적용된 결제에서 할부 수수료를 부담하는 주체",
  })
  interest_payer: string;
  /*
  할부가 적용된 결제에서 할부 수수료를 부담하는 주체입니다. BUYER, CARD_COMPANY, MERCHANT 중 하나입니다.
  - BUYER: 상품을 구매한 고객이 할부 수수료를 부담합니다. 일반적인 할부 결제입니다.
  - CARD_COMPANY: 카드사에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
  - MERCHANT: 상점에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
   */
}

// TODO :: 취소 history 테이블
// @ApiProperty({
//   nullable: true,
//   description: "결제 취소 이력이 담기는 배열",
//   items: { $ref: getSchemaPath(TossPaymentCancel) },
// })
// cancels: TossPaymentCancel[] | null;

// TODO :: 간편결제 테이블
// @ApiProperty({
//   description: "간편결제 정보",
//   nullable: true,
//   items: { $ref: getSchemaPath(TossPaymentEasyPay) },
// })
// easyPay: TossPaymentEasyPay | null;

// TODO :: 결제 실패 테이블
// @ApiProperty({
//   description: "결제 승인에 실패하면 응답",
//   nullable: true,
//   items: { $ref: getSchemaPath(TossPaymentErrorDto) },
// })
// failure: TossPaymentErrorDto | null;

// TODO :: 가상계좌 테이블
// @ApiProperty({
//   nullable: true,
//   description: "가상계좌로 결제하면 제공되는 가상계좌 관련 정보",
//   items: { $ref: getSchemaPath(TossPaymentVirtualAccountDto) },
// })
// virtualAccount: TossPaymentVirtualAccountDto | null;

// TODO :: 현금 영수증 history 테이블
// @ApiProperty({
//   type: "array",
//   description: "현금영수증 정보",
//   nullable: true,
//   items: { $ref: getSchemaPath(TossPaymentCashReceipts) },
// })
// @IsOptional()
// cashReceipts: TossPaymentCashReceipts[] | null;
