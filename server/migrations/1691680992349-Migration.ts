import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691680992349 implements MigrationInterface {
    name = 'Migration1691680992349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD "product_pk" integer`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "UQ_097c7ea68d87ad746a14fd7df3d" UNIQUE ("product_pk")`);
        await queryRunner.query(`COMMENT ON COLUMN "purchase_item"."product_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_097c7ea68d87ad746a14fd7df3d" FOREIGN KEY ("product_pk") REFERENCES "product"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_097c7ea68d87ad746a14fd7df3d"`);
        await queryRunner.query(`COMMENT ON COLUMN "purchase_item"."product_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "UQ_097c7ea68d87ad746a14fd7df3d"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP COLUMN "product_pk"`);
    }

}
