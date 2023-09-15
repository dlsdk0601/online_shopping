import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TimeSet from "./timeSet.entity";
import { Purchase } from "./Purchase.entity";
import { PaymentStatus, PaymentType } from "../type/commonType";

@Entity("payment")
export class Payment extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @OneToOne(() => Purchase, (purchase) => purchase, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "purchase_pk", referencedColumnName: "pk" })
  purchase: Purchase;

  @Column({ enum: PaymentType, type: "enum", nullable: false })
  type: PaymentType;
}

@Entity("toss_payment")
export class TossPayment extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 128,
    comment: "거래를 구분할 수 있는 토스 고유 값",
  })
  pay_token: string;

  @Column({ enum: PaymentStatus, type: "enum", nullable: false })
  status: PaymentStatus;
}
