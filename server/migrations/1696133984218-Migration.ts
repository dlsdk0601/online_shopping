import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696133984218 implements MigrationInterface {
    name = 'Migration1696133984218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment_approve" RENAME COLUMN "approvedAt" TO "approved_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment_approve" RENAME COLUMN "approved_at" TO "approvedAt"`);
    }

}
