import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TimeSet from "./timeSet.entity";
import { ProductCategory } from "../type/commonType";
import { Asset } from "./asset.entity";

@Entity("main_banner")
export class MainBanner extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", length: 128, nullable: false, comment: "배너 제목" })
  title: string;

  @Column({ type: "varchar", length: 256, nullable: false, comment: "배너 서브 제목" })
  sub_title: string;

  @Column({ type: "text", nullable: true, comment: "배너 설명" })
  description: string | null;

  @Column({
    type: "enum",
    enum: ProductCategory,
    nullable: false,
    comment: "카테고리",
    unique: true,
  })
  category: ProductCategory;

  @OneToOne(() => Asset, (asset) => asset, { nullable: false, createForeignKeyConstraints: false })
  @JoinColumn({ name: "image_pk", referencedColumnName: "pk" })
  image: Asset;
}
