import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694793684125 implements MigrationInterface {
    name = 'Migration1694793684125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum" AS ENUM('TOSS', 'KAKAO')`);
        await queryRunner.query(`CREATE TABLE "payment" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "type" "public"."payment_type_enum" NOT NULL, "purchase_pk" integer NOT NULL, CONSTRAINT "REL_54a9b272610c700f0c014407b3" UNIQUE ("purchase_pk"), CONSTRAINT "PK_968ccba59c4e744a5275346a70b" PRIMARY KEY ("pk")); COMMENT ON COLUMN "payment"."create_at" IS '생성 일자'; COMMENT ON COLUMN "payment"."update_at" IS '수정 일자'; COMMENT ON COLUMN "payment"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "payment"."pk" IS 'pk'; COMMENT ON COLUMN "payment"."purchase_pk" IS 'pk'`);
        await queryRunner.query(`CREATE TYPE "public"."toss_payment_status_enum" AS ENUM('SUCCESS', 'FAIL')`);
        await queryRunner.query(`CREATE TABLE "toss_payment" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "pay_token" character varying(128) NOT NULL, "status" "public"."toss_payment_status_enum" NOT NULL, CONSTRAINT "PK_099d05a5d86c093e405b8928ca8" PRIMARY KEY ("pk")); COMMENT ON COLUMN "toss_payment"."create_at" IS '생성 일자'; COMMENT ON COLUMN "toss_payment"."update_at" IS '수정 일자'; COMMENT ON COLUMN "toss_payment"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "toss_payment"."pk" IS 'pk'; COMMENT ON COLUMN "toss_payment"."pay_token" IS '거래를 구분할 수 있는 토스 고유 값'`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_54a9b272610c700f0c014407b32" FOREIGN KEY ("purchase_pk") REFERENCES "purchase"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_54a9b272610c700f0c014407b32"`);
        await queryRunner.query(`DROP TABLE "toss_payment"`);
        await queryRunner.query(`DROP TYPE "public"."toss_payment_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
    }

}
