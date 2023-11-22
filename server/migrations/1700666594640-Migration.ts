import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700666594640 implements MigrationInterface {
    name = 'Migration1700666594640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "payment_failure_pk_seq" OWNED BY "payment_failure"."pk"`);
        await queryRunner.query(`ALTER TABLE "payment_failure" ALTER COLUMN "pk" SET DEFAULT nextval('"payment_failure_pk_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_failure" ALTER COLUMN "pk" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "payment_failure_pk_seq"`);
    }

}
