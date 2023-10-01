import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696136270776 implements MigrationInterface {
  name = "Migration1696136270776";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" DROP CONSTRAINT "FK_0fd5ab6695ef1dc38d42397355b"`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" RENAME COLUMN "toss_payment_approve_pk" TO "payment_pk"`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" ADD CONSTRAINT "FK_828d8f4f100c84de4ca6fb8d3db" FOREIGN KEY ("payment_pk") REFERENCES "payment"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "toss_payment_failure" RENAME TO "payment_failure"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment_failure" RENAME TO "toss_payment_failure"`);
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" DROP CONSTRAINT "FK_828d8f4f100c84de4ca6fb8d3db"`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" RENAME COLUMN "payment_pk" TO "toss_payment_approve_pk"`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_failure" ADD CONSTRAINT "FK_0fd5ab6695ef1dc38d42397355b" FOREIGN KEY ("toss_payment_approve_pk") REFERENCES "toss_payment_approve"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
