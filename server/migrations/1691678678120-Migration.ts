import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691678678120 implements MigrationInterface {
    name = 'Migration1691678678120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "purchase"."create_at" IS '생성 일자'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "purchase"."create_at" IS '생성 일자'`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "create_at"`);
    }

}
