import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TimeSet from "./timeSet.entity";
import { UserType } from "../type/commonType";
import { LocalUser } from "./local-user.entity";
import { GoogleUser } from "./google-user.entity";
import { KakaoUser } from "./kakao-user.entity";
import { NaverUser } from "./naver-user.entity";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "./user-authentication.entity";

export type FrontUserAuth =
  | LocalAuthentication
  | KakaoAuthentication
  | GoogleAuthentication
  | NaverAuthentication;

export type FrontUserAuths =
  | LocalAuthentication[]
  | KakaoAuthentication[]
  | GoogleAuthentication[]
  | NaverAuthentication[];

@Entity("user")
export class User extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "유저 이름", length: 32 })
  name: string;

  @Column({ type: "varchar", nullable: true, comment: "유저 휴대폰", length: 32 })
  phone: string | null;

  @Column({ enum: UserType, type: "enum", nullable: false })
  type: UserType;

  @OneToOne(() => LocalUser, (localUser) => localUser.user)
  localUser: LocalUser;

  @OneToOne(() => GoogleUser, (googleUser) => googleUser.user)
  googleUser: GoogleUser;

  @OneToOne(() => KakaoUser, (kakaoUser) => kakaoUser.user)
  kakaoUser: KakaoUser;

  @OneToOne(() => NaverUser, (naverUser) => naverUser.user)
  naverUser: NaverUser;

  userData() {
    const userType = `${this.type.toLowerCase()}User`;
    const userData: LocalUser | GoogleUser | KakaoUser | NaverUser = this[userType];

    return {
      pk: this.pk,
      id: userData instanceof GoogleUser ? "" : userData.id,
      name: this.name,
      phone: this.phone,
      type: this.type,
      email: userData.email,
      createAt: this.create_at,
      updateAt: this.update_at,
    };
  }

  get auths() {
    const userType = `${this.type.toLowerCase()}User`;
    const userData: LocalUser | GoogleUser | KakaoUser | NaverUser = this[userType];

    return userData.auth;
  }
}
