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

  // 결제 기록은 남아야 하기 때문에 cascade 를 넣지 않는다.
  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, { nullable: false })
  purchaseItems: PurchaseItem[];
}

@Entity("purchase_item")
export class PurchaseItem extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @CreateDateColumn({ comment: "생성 일자", nullable: false })
  create_at: Date;

  @UpdateDateColumn({ comment: "수정 일자", nullable: true })
  update_at: Date | null;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseItems)
  purchase: Purchase;

  @Column({ enum: PurchaseItemStatus, type: "enum", nullable: false })
  status: PurchaseItemStatus;

  @OneToOne(() => Product, (product) => product)
  @JoinColumn({ name: "product_pk", referencedColumnName: "pk" })
  product: Product;
}
