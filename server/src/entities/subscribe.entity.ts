import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import moment from "moment";
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

  @OneToOne(() => User, { onDelete: "CASCADE", eager: true })
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

  @Column({ type: "timestamptz", nullable: false, comment: "발송 시간" })
  send_time: Date;

  @Column({ type: "boolean", nullable: false, comment: "발송 완료 여부", default: false })
  is_send: boolean;

  @ManyToMany(() => User, { onDelete: "CASCADE", cascade: true })
  @JoinTable()
  users: User[];

  get enableResend() {
    const today = moment();
    const sendDay = moment(this.send_time);
    // 시간은 지났는데, 안보내 졌을 떄
    return !this.is_send && sendDay.isBefore(today);
  }
}
