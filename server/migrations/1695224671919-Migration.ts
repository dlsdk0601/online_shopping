import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695224671919 implements MigrationInterface {
    name = 'Migration1695224671919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "errorCode"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "checkoutPage"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "checkout_page" character varying(256) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."checkout_page" IS '결제를 진행할 수 있는 토스페이 웹페이지 URL'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "error_code" character varying(64) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."error_code" IS '에러 코드'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."error_code" IS '에러 코드'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "error_code"`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."checkout_page" IS '결제를 진행할 수 있는 토스페이 웹페이지 URL'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "checkout_page"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "checkoutPage" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "errorCode" character varying(64) NOT NULL`);
    }

}
