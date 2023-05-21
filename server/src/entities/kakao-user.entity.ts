import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { KakaoAuthentication } from "./user-authentication.entity";
import { User } from "./user.entity";

@Entity("kakao_user")
export class KakaoUser extends BaseEntity {
  @Column({ type: "varchar", nullable: false, comment: "카카오 아이디", length: 64, unique: true })
  id: string;

  @Column({ type: "varchar", nullable: false, comment: "카카오 이메일", length: 64 })
  email: string;

  @Column({ type: "varchar", nullable: false, comment: "닉네임", length: 64 })
  social_name: string;

  @OneToMany(() => KakaoAuthentication, (auth) => auth.kakao_user)
  auth: KakaoAuthentication[];

  @PrimaryColumn()
  pk: number;

  @OneToOne(() => User, (user) => user.kakaoUser, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pk", referencedColumnName: "pk" })
  user: User;
}
