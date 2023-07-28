import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TimeSet from "./timeSet.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity("cart")
export class Cart extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, { nullable: true })
  cart_products: CartProduct[];
}

@Entity("cart_product")
export class CartProduct extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  @ManyToOne(() => Cart, (cart) => cart.cart_products)
  cart: Cart;

  @OneToOne(() => Product, (product) => product, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "product_pk", referencedColumnName: "pk" })
  product: Product;

  @Column({ type: "int", nullable: false, comment: "상품 수량" })
  count: number;
}
