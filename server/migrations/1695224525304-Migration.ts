import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695224525304 implements MigrationInterface {
    name = 'Migration1695224525304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "purchase_pk" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD CONSTRAINT "UQ_2cb856aaaf347a3edf04261df99" UNIQUE ("purchase_pk")`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."purchase_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD CONSTRAINT "FK_2cb856aaaf347a3edf04261df99" FOREIGN KEY ("purchase_pk") REFERENCES "payment"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP CONSTRAINT "FK_2cb856aaaf347a3edf04261df99"`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."purchase_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP CONSTRAINT "UQ_2cb856aaaf347a3edf04261df99"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "purchase_pk"`);
    }

}
