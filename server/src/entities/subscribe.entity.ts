import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToOne(() => User)
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
}
