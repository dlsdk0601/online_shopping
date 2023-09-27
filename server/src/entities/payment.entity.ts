import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TimeSet from "./timeSet.entity";
import { Purchase } from "./Purchase.entity";
import {
  TossPaymentCartType,
  TossPaymentMethod,
  TossPaymentStatus,
  TossPaymentType,
} from "../type/commonType";

// sdk 에서 결제가 생성된 구매 내역 테이블
@Entity("payment")
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @OneToOne(() => Purchase, {
    nullable: false,
  })
  @JoinColumn({ name: "purchase_pk", referencedColumnName: "pk" })
  purchase: Purchase;

  @Column({ type: "varchar", nullable: false, length: 256, comment: "결제 키" })
  payment_key: string;

  @Column({ type: "enum", enum: TossPaymentType, nullable: false, comment: "결제 유형" })
  payment_type: TossPaymentType;

  @CreateDateColumn({ comment: "생성 일자", nullable: false })
  create_at: Date;
}

@Entity("toss_payment")
export class TossPayment extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "int", nullable: false, comment: "응답 코드" })
  code: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 256,
    comment: "결제를 진행할 수 있는 토스페이 웹페이지 URL",
  })
  checkout_page: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 30,
    comment: "거래를 구분할 수 있는 토스 고유 값",
  })
  pay_token: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 128,
    comment: "응답이 성공이 아닌 경우 설명 메세지",
  })
  msg: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 64,
    comment: "에러 코드",
  })
  error_code: string;

  @OneToOne(() => Payment, (payment) => payment, {
    nullable: false,
  })
  @JoinColumn({ name: "purchase_pk", referencedColumnName: "pk" })
  payment: Payment;
}

@Entity("toss_payment_callback")
export class TossPaymentCallback extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({
    type: "enum",
    enum: TossPaymentStatus,
    nullable: false,
    comment: "결제 완료, 환불 등 '결제 완료' 이외 상태는 전달되지 않습니다.",
  })
  status: TossPaymentStatus;

  @Column({ type: "varchar", nullable: false, length: 32, comment: "승인된 결제 토큰" })
  pay_token: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 64,
    comment: "결제생성 구간에서 전달된 가맹점 주문번호",
  })
  order_no: string;

  @Column({
    type: "enum",
    enum: TossPaymentMethod,
    nullable: false,
    comment: "승인된 결제수단",
  })
  pay_method: string;

  @Column({ type: "int", nullable: false, comment: "결제요청된 금액" })
  amount: number;

  @Column({ type: "int", nullable: false, comment: "할인된 금액" })
  discounted_amount: number;

  // 총 금액 중 할인된 금액을 제외한 순수 지불수단 승인금액입니다. 현금영수증 자체 발행을 사용하는 가맹점은 이 값으로 발행 처리해 주시면 됩니다.
  @Column({ type: "int", nullable: false, comment: "지불수단 승인금액" })
  paid_amount: number;

  @Column({ type: "timestamptz", nullable: false, comment: "결제 완료 처리 시간" })
  paid_ts: Date;

  // 결제의 거래구분을 위하여 토스 서버에서 유니크한 값을 생성해서 전달드립니다.
  @Column({ type: "varchar", nullable: false, length: 64, comment: "거래 트랜잭션 아이디" })
  transaction_id: string;

  @Column({ type: "int", nullable: true, comment: "승인된 카드사 코드" })
  card_company_code: number | null;

  @Column({ type: "varchar", nullable: false, length: 8, default: "", comment: "카드 승인번호" })
  card_authorization_no: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 8,
    default: "",
    comment: "사용자가 선택한 카드 할부개월",
  })
  spread_out: string;

  // true 무이자, false 일반
  @Column({ type: "boolean", nullable: true, comment: "카드 무이자 적용 여부" })
  no_interest: boolean | null;

  @Column({ type: "enum", enum: TossPaymentCartType, nullable: true, comment: "카드 타입" })
  card_method_type: TossPaymentCartType;

  @Column({
    type: "varchar",
    nullable: false,
    length: 32,
    default: "",
    comment: "마스킹된 카드번호",
  })
  card_number: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 256,
    default: "",
    comment: "신용카드 매출전표 호출URL",
  })
  sales_check_link_url: string;
}
