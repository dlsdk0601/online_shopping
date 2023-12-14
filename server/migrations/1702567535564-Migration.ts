import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702567535564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table toss_payment_virtual_account`);
    await queryRunner.query(
      `DROP TYPE "public"."toss_payment_virtual_account_settlement_status_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."toss_payment_virtual_account_refund_status_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."toss_payment_virtual_account_refund_status_enum" AS ENUM('NONE', 'PENDING', 'FAILED', 'PARTIAL_FAILED', 'COMPLETED')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."toss_payment_virtual_account_settlement_status_enum" AS ENUM('INCOMPLETED', 'COMPLETED')`
    );
    await queryRunner.query(
      `CREATE TABLE "toss_payment_virtual_account" ("pk" SERIAL NOT NULL, "account_type" character varying(16) NOT NULL, "account_number" character varying(32) NOT NULL, "bank_code" character varying(4) NOT NULL, "customer_name" character varying(124) NOT NULL, "due_date" TIMESTAMP WITH TIME ZONE NOT NULL, "refund_status" "public"."toss_payment_virtual_account_refund_status_enum" NOT NULL, "expired" boolean NOT NULL, "settlement_status" "public"."toss_payment_virtual_account_settlement_status_enum" NOT NULL, "toss_payment_approve_pk" integer NOT NULL, CONSTRAINT "REL_3d3842b1ad51403a88dd73856d" UNIQUE ("toss_payment_approve_pk"), CONSTRAINT "PK_62c1ac7b0443668ec87cd8984f6" PRIMARY KEY ("pk")); COMMENT ON COLUMN "toss_payment_virtual_account"."pk" IS 'pk'; COMMENT ON COLUMN "toss_payment_virtual_account"."account_type" IS '가상계좌 타입(일반, 고정 중 하나)'; COMMENT ON COLUMN "toss_payment_virtual_account"."account_number" IS '발급된 계좌번호'; COMMENT ON COLUMN "toss_payment_virtual_account"."bank_code" IS '가상계좌 은행 숫자 코드'; COMMENT ON COLUMN "toss_payment_virtual_account"."customer_name" IS '가상계좌를 발급한 고객 이름'; COMMENT ON COLUMN "toss_payment_virtual_account"."due_date" IS '입금 기한'; COMMENT ON COLUMN "toss_payment_virtual_account"."refund_status" IS '환불 처리 상태'; COMMENT ON COLUMN "toss_payment_virtual_account"."expired" IS '가상계좌가 만료되었는지 여부'; COMMENT ON COLUMN "toss_payment_virtual_account"."settlement_status" IS '정산 상태'; COMMENT ON COLUMN "toss_payment_virtual_account"."toss_payment_approve_pk" IS 'pk'`
    );

    await queryRunner.query(
      `ALTER TABLE "toss_payment_virtual_account" ADD CONSTRAINT "FK_3d3842b1ad51403a88dd73856d2" FOREIGN KEY ("toss_payment_approve_pk") REFERENCES "toss_payment_approve"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
