import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702907761491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_banner" ADD CONSTRAINT "UQ_79be6d802143ad04dc47333d6a1" UNIQUE ("category")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_banner" DROP CONSTRAINT "UQ_79be6d802143ad04dc47333d6a1";`
    );
  }
}
