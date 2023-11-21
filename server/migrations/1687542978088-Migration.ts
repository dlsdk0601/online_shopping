import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687542978088 implements MigrationInterface {
  name = "Migration1687542978088";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscribe_history" ADD "send_time" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "subscribe_history"."send_time" IS '발송 시간'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "subscribe_history"."send_time" IS '발송 시간'`);
    await queryRunner.query(`ALTER TABLE "subscribe_history" DROP COLUMN "send_time"`);
  }
}
