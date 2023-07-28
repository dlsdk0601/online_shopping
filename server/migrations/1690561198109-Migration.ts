import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690561198109 implements MigrationInterface {
    name = 'Migration1690561198109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "userPk" integer, CONSTRAINT "PK_c677f4504edbf492c074c53c584" PRIMARY KEY ("pk")); COMMENT ON COLUMN "cart"."create_at" IS '생성 일자'; COMMENT ON COLUMN "cart"."update_at" IS '수정 일자'; COMMENT ON COLUMN "cart"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "cart"."pk" IS 'pk'; COMMENT ON COLUMN "cart"."userPk" IS 'pk'`);
        await queryRunner.query(`CREATE TABLE "cart_product" ("pk" SERIAL NOT NULL, "count" integer NOT NULL, "cartPk" integer, "product_pk" integer NOT NULL, CONSTRAINT "PK_4694077770ea9f78378ab334416" PRIMARY KEY ("pk")); COMMENT ON COLUMN "cart_product"."pk" IS 'pk'; COMMENT ON COLUMN "cart_product"."count" IS '상품 수량'; COMMENT ON COLUMN "cart_product"."cartPk" IS 'pk'; COMMENT ON COLUMN "cart_product"."product_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_e2305d88e1284630a7eadff7789" FOREIGN KEY ("userPk") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_f522c2134db12bba355022f826a" FOREIGN KEY ("cartPk") REFERENCES "cart"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_f522c2134db12bba355022f826a"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_e2305d88e1284630a7eadff7789"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
