import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export default abstract class Auth extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "토큰 값", length: 512 })
  token: string;

  @Column({ type: "varchar", nullable: false, comment: "ip 값", length: 512 })
  ip: string;

  @Column({ type: "varchar", nullable: false, comment: "디바이스 정보", length: 512 })
  device: string;

  @Column({ type: "date", nullable: false, comment: "유효 기간" })
  expired_at: Date;
}
