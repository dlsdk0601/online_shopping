import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import moment from "moment";
import TimeSet from "./timeSet.entity";
import Authentication from "./manager-authentication.entity";

export enum ManagerType {
  MANAGER = "MANAGER",
  SUPER = "SUPER",
}

@Entity("manager")
export default class Manager extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "이름", length: 64 })
  name: string;

  @Column({ type: "varchar", nullable: false, comment: "이메일", length: 128 })
  email: string;

  @Column({ type: "varchar", nullable: false, comment: "로그인 아이디", length: 128 })
  id: string;

  @Column({ type: "varchar", nullable: false, comment: "비밀번호", length: 286 })
  password_hash: string;

  @Column({
    type: "enum",
    enum: ManagerType,
    nullable: false,
    comment: "타입",
    default: ManagerType.MANAGER,
  })
  type: ManagerType;

  @OneToMany(() => Authentication, (authentication) => authentication.manager)
  authentications: Authentication[];

  // TODO :: 안쓸꺼면 지우기
  validAuth() {
    return this.authentications.find((authentication) =>
      moment(authentication.expired_at).isAfter(new Date())
    );
  }
}
