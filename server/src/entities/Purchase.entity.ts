import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { PurchaseItemStatus } from "../type/commonType";
import { Product } from "./product.entity";

@Entity("purchase")
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @CreateDateColumn({ comment: "생성 일자", nullable: false })
  create_at: Date;

  @Column({ comment: "주문 번호", nullable: false, type: "varchar", length: 64 })
  order_code: string;

  // 결제 기록은 남아야 하기 때문에 cascade 를 넣지 않는다.
  @ManyToOne(() => User, (user) => user.purchases, {
    nullable: false,
  })
  @JoinColumn({ name: "user_pk", referencedColumnName: "pk" })
  user: User;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    eager: true,
    cascade: true,
  })
  purchase_items: PurchaseItem[];
}

@Entity("purchase_item")
export class PurchaseItem extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @CreateDateColumn({ comment: "생성 일자", nullable: false })
  create_at: Date;

  @UpdateDateColumn({ comment: "수정 일자", nullable: true })
  update_at: Date | null;

  @Column({ enum: PurchaseItemStatus, type: "enum", nullable: false })
  status: PurchaseItemStatus;

  @Column({ comment: "수량", type: "int", nullable: false })
  count: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchase_items, {
    nullable: false,
  })
  @JoinColumn({ name: "purchase_pk", referencedColumnName: "pk" })
  purchase: Purchase;

  @OneToOne(() => Product, (product) => product, {
    createForeignKeyConstraints: false, // constraint 유니크 해제
  })
  @JoinColumn({ name: "product_pk", referencedColumnName: "pk" })
  product: Product;
}
