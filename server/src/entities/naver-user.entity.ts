import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { NaverAuthentication } from "./user-authentication.entity";
import { User } from "./user.entity";

@Entity("naver_user")
export class NaverUser extends BaseEntity {
  @Column({ type: "varchar", nullable: false, comment: "네이버 아이디", length: 64 })
  id: string;

  @Column({ type: "varchar", nullable: false, comment: "네이버 이메일", length: 64 })
  email: string;

  @OneToMany(() => NaverAuthentication, (auth) => auth.naver_user)
  auth: NaverAuthentication[];

  @PrimaryColumn()
  pk: number;

  @OneToOne(() => User, (user) => user.naverUser)
  @JoinColumn({ name: "pk", referencedColumnName: "pk" })
  user: User;
}
