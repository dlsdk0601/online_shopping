import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692202139788 implements MigrationInterface {
    name = 'Migration1692202139788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD "count" integer NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "purchase_item"."count" IS '수량'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "purchase_item"."count" IS '수량'`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP COLUMN "count"`);
    }

}
