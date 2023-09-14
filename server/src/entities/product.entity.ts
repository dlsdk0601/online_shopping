import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TimeSet from "./timeSet.entity";
import { Asset } from "./asset.entity";
import { ProductCategory } from "../type/commonType";

@Entity("product")
export class Product extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @Column({ type: "varchar", nullable: false, comment: "상품 이름", length: 64 })
  name: string;

  @Column({ type: "varchar", nullable: false, comment: "상품 설명 타이틀", length: 256 })
  description_title: string;

  @Column({ type: "text", nullable: false, comment: "상품 설명" })
  description: string;

  @Column({ type: "int", nullable: false, comment: "상품 가격" })
  price: number;

  @OneToOne(() => Asset, (asset) => asset, {
    nullable: false,
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: "main_image_pk", referencedColumnName: "pk" })
  main_image: Asset;

  @ManyToMany(() => Asset, {
    nullable: false,
    onDelete: "CASCADE",
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  sub_images: Asset[];

  @Column({ type: "int", nullable: false, comment: "상품 재고" })
  stock_count: number;

  @Column({ enum: ProductCategory, type: "enum", nullable: false })
  category: ProductCategory;

  // TODO :: 별점
}
