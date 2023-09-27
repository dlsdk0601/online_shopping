import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase.entity";
import { TossPaymentType } from "../type/commonType";

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
