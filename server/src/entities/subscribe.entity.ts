import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TimeSet from "./timeSet.entity";
import { User } from "./user.entity";

@Entity("subscribe")
export class Subscribe extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "이메일 주소", length: 128 })
  email: string;

  @Column({ type: "varchar", nullable: false, comment: "이름", length: 64 })
  name: string;

  @Column({ type: "int", nullable: false, comment: "유저 외래키" })
  user_pk: number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_pk", referencedColumnName: "pk" })
  user: User;
}

@Entity("subscribe_history")
export class SubscribeHistory extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "메일 제목", length: 256 })
  title: string;

  @Column({ type: "text", nullable: false, comment: "메일 본문" })
  body: string;

  @Column({ type: "date", nullable: false, comment: "발송 시간" })
  send_time: Date;

  @Column({ type: "boolean", nullable: false, comment: "발송 완료 여부", default: false })
  is_send: boolean;
}

// history X user secondary
@Entity("subscribe_history_user")
export class SubscribeHistoryUser extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @ManyToOne(() => SubscribeHistory, { onDelete: "CASCADE" })
  @JoinColumn({ name: "history_pk", referencedColumnName: "pk" })
  histories: SubscribeHistory[];

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_pk", referencedColumnName: "pk" })
  user: User;
}
