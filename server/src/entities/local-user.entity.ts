import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { LocalAuthentication } from "./user-authentication.entity";
import { User } from "./user.entity";

@Entity("local_user")
export class LocalUser extends BaseEntity {
  @Column({ type: "varchar", nullable: false, comment: "로그인 아이디", length: 128 })
  id: string;

  @Column({ type: "varchar", nullable: false, comment: "이메일", length: 128 })
  email: string;

  @Column({ type: "varchar", nullable: false, comment: "비밀번호", length: 512 })
  password_hash: string;

  @OneToMany(() => LocalAuthentication, (auth) => auth.local_user)
  auth: LocalAuthentication[];

  @PrimaryColumn()
  pk: number;

  @OneToOne(() => User, (user) => user.localUser)
  @JoinColumn({ name: "pk", referencedColumnName: "pk" })
  user: User;
}
