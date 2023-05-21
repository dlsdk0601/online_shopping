import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("asset")
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "파일 이름", length: 64 })
  name: string;

  @Column({ type: "varchar", nullable: false, comment: "확장자", length: 64 })
  content_type: string;

  @Column({ type: "varchar", nullable: false, comment: "uuid", length: 64 })
  uuid: string;

  @Column({ type: "varchar", nullable: false, comment: "url", length: 256 })
  url: string;

  @Column({ type: "varchar", nullable: false, comment: "다운로드 url", length: 256 })
  download_url: string;
}
