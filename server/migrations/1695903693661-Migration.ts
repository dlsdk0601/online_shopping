import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695903693661 implements MigrationInterface {
    name = 'Migration1695903693661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment_virtual_account" RENAME COLUMN "accountN_number" TO "account_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment_virtual_account" RENAME COLUMN "account_number" TO "accountN_number"`);
    }

}
