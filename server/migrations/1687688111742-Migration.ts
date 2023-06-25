import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687688111742 implements MigrationInterface {
    name = 'Migration1687688111742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_category_enum" AS ENUM('MEN', 'WOMEN', 'KIDS', 'ACCESSORY')`);
        await queryRunner.query(`CREATE TABLE "product" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "description_title" character varying(256) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock_count" integer NOT NULL, "category" "public"."product_category_enum" NOT NULL, "main_image_pk" integer NOT NULL, CONSTRAINT "REL_586b487fb91633fee0ec3e1b49" UNIQUE ("main_image_pk"), CONSTRAINT "PK_8930827b8fb101ccaaf9afa7a6f" PRIMARY KEY ("pk")); COMMENT ON COLUMN "product"."create_at" IS '생성 일자'; COMMENT ON COLUMN "product"."update_at" IS '수정 일자'; COMMENT ON COLUMN "product"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "product"."pk" IS 'pk'; COMMENT ON COLUMN "product"."name" IS '상품 이름'; COMMENT ON COLUMN "product"."description_title" IS '상품 설명 타이틀'; COMMENT ON COLUMN "product"."description" IS '상품 설명'; COMMENT ON COLUMN "product"."price" IS '상품 가격'; COMMENT ON COLUMN "product"."stock_count" IS '상품 재고'; COMMENT ON COLUMN "product"."main_image_pk" IS 'pk'`);
        await queryRunner.query(`CREATE TABLE "product_sub_images_asset" ("productPk" integer NOT NULL, "assetPk" integer NOT NULL, CONSTRAINT "PK_1e3e1cafee72b4306acba1c700c" PRIMARY KEY ("productPk", "assetPk"))`);
        await queryRunner.query(`CREATE INDEX "IDX_151a4d409941427e5073efcbf1" ON "product_sub_images_asset" ("productPk") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca30c6fc626cac143d277c32cd" ON "product_sub_images_asset" ("assetPk") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_586b487fb91633fee0ec3e1b497" FOREIGN KEY ("main_image_pk") REFERENCES "asset"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sub_images_asset" ADD CONSTRAINT "FK_151a4d409941427e5073efcbf1f" FOREIGN KEY ("productPk") REFERENCES "product"("pk") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_sub_images_asset" ADD CONSTRAINT "FK_ca30c6fc626cac143d277c32cde" FOREIGN KEY ("assetPk") REFERENCES "asset"("pk") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_sub_images_asset" DROP CONSTRAINT "FK_ca30c6fc626cac143d277c32cde"`);
        await queryRunner.query(`ALTER TABLE "product_sub_images_asset" DROP CONSTRAINT "FK_151a4d409941427e5073efcbf1f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_586b487fb91633fee0ec3e1b497"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca30c6fc626cac143d277c32cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_151a4d409941427e5073efcbf1"`);
        await queryRunner.query(`DROP TABLE "product_sub_images_asset"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
    }

}
