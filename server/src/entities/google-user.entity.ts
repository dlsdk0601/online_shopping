import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { GoogleAuthentication } from "./user-authentication.entity";
import { User } from "./user.entity";

@Entity("google_user")
export class GoogleUser extends BaseEntity {
  @Column({ type: "varchar", nullable: false, comment: "google 유저 sub 아이디", length: 512 })
  sub: string;

  @Column({ type: "varchar", nullable: false, comment: "구글 이메일", length: 64 })
  email: string;

  @Column({ type: "varchar", nullable: false, comment: "닉네임", length: 64 })
  social_name: string;

  @OneToMany(() => GoogleAuthentication, (auth) => auth.google_user)
  auth: GoogleAuthentication[];

  @PrimaryColumn()
  pk: number;

  @OneToOne(() => User, (user) => user.googleUser)
  @JoinColumn({ name: "pk", referencedColumnName: "pk" })
  user: User;
}
