import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695893663174 implements MigrationInterface {
  name = "Migration1695893663174";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."toss_payment_approve_status_enum" AS ENUM('READY', 'IN_PROGRESS', 'WAITING_FOR_DEPOSIT', 'DONE', 'CANCELED', 'PARTIAL_CANCELED', 'ABORTED', 'EXPIRED')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."toss_payment_approve_type_enum" AS ENUM('NORMAL', 'BRANDPAY', 'KEYIN')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."toss_payment_approve_card_acquire_status_enum" AS ENUM('READY', 'REQUESTED', 'COMPLETED', 'CANCEL_REQUESTED', 'CANCELED')`
    );
    await queryRunner.query(
      `CREATE TABLE "toss_payment_approve" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "mid" character varying(16) NOT NULL, "version" character varying(16) NOT NULL, "payment_key" character varying(256) NOT NULL, "status" "public"."toss_payment_approve_status_enum" NOT NULL, "last_transaction_key" character varying(64) NOT NULL DEFAULT '', "order_id" character varying(64) NOT NULL, "order_name" character varying(128) NOT NULL, "requested_at" TIMESTAMP WITH TIME ZONE NOT NULL, "approvedAt" date NOT NULL, "use_escrow" boolean NOT NULL, "culture_expense" boolean NOT NULL, "discount" integer, "secret" character varying(64) NOT NULL DEFAULT '', "type" "public"."toss_payment_approve_type_enum" NOT NULL, "country" character varying(8) NOT NULL, "is_partial_cancelable" boolean NOT NULL, "receipt" character varying(256) NOT NULL, "checkout" character varying(256) NOT NULL, "currency" character varying(16) NOT NULL, "total_amount" integer NOT NULL, "balance_amount" integer NOT NULL, "supplied_amount" integer NOT NULL, "vat" integer NOT NULL, "tax_free_amount" integer NOT NULL, "method" character varying(16) NOT NULL, "payment_pk" integer NOT NULL, CONSTRAINT "REL_1fbc535314f938b7e9b3a261a2" UNIQUE ("payment_pk"), CONSTRAINT "PK_99a3f36eef73a1b6ebf58349eda" PRIMARY KEY ("pk")); COMMENT ON COLUMN "toss_payment_approve"."create_at" IS '생성 일자'; COMMENT ON COLUMN "toss_payment_approve"."update_at" IS '수정 일자'; COMMENT ON COLUMN "toss_payment_approve"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "toss_payment_approve"."pk" IS 'pk'; COMMENT ON COLUMN "toss_payment_approve"."mid" IS '상점 코드'; COMMENT ON COLUMN "toss_payment_approve"."version" IS '상점 코드'; COMMENT ON COLUMN "toss_payment_approve"."payment_key" IS 'tosspay paymentKey'; COMMENT ON COLUMN "toss_payment_approve"."status" IS '결제 처리 상태'; COMMENT ON COLUMN "toss_payment_approve"."last_transaction_key" IS '마지막 거래의 키 값'; COMMENT ON COLUMN "toss_payment_approve"."order_id" IS '주문 번호'; COMMENT ON COLUMN "toss_payment_approve"."order_name" IS '상품명'; COMMENT ON COLUMN "toss_payment_approve"."requested_at" IS '결제가 일어난 날짜와 시간'; COMMENT ON COLUMN "toss_payment_approve"."approvedAt" IS '결제 승인이 일어난 날짜와 시간'; COMMENT ON COLUMN "toss_payment_approve"."use_escrow" IS '에스크로 사용 여부'; COMMENT ON COLUMN "toss_payment_approve"."culture_expense" IS '문화비 지출 여부'; COMMENT ON COLUMN "toss_payment_approve"."discount" IS '카드사의 즉시 할인 프로모션 정보'; COMMENT ON COLUMN "toss_payment_approve"."secret" IS '가상계좌 웹훅이 정상적인 요청인지 검증하는 값'; COMMENT ON COLUMN "toss_payment_approve"."type" IS '결제 타입 정보'; COMMENT ON COLUMN "toss_payment_approve"."country" IS '결제한 국가'; COMMENT ON COLUMN "toss_payment_approve"."is_partial_cancelable" IS '부분 취소 가능 여부'; COMMENT ON COLUMN "toss_payment_approve"."receipt" IS '발행된 영수증 정보'; COMMENT ON COLUMN "toss_payment_approve"."checkout" IS '결제창 정보'; COMMENT ON COLUMN "toss_payment_approve"."currency" IS '결제할 때 사용한 통화'; COMMENT ON COLUMN "toss_payment_approve"."total_amount" IS '총 결제 금액'; COMMENT ON COLUMN "toss_payment_approve"."balance_amount" IS '취소할 수 있는 금액(잔고)'; COMMENT ON COLUMN "toss_payment_approve"."supplied_amount" IS '공급가액'; COMMENT ON COLUMN "toss_payment_approve"."vat" IS '부가세'; COMMENT ON COLUMN "toss_payment_approve"."tax_free_amount" IS '결제 금액 중 면세 금액'; COMMENT ON COLUMN "toss_payment_approve"."method" IS '결제 수단'; COMMENT ON COLUMN "toss_payment_approve"."payment_pk" IS 'pk'`
    );
    await queryRunner.query(
      `CREATE TABLE "toss_payment_approve_card" ("pk" SERIAL NOT NULL, "amount" integer NOT NULL, "issuer_code" character varying(8) NOT NULL, "acquirer_code" character varying(8) DEFAULT '', "number" character varying(32) NOT NULL, "installment_plan_months" integer NOT NULL, "approve_no" character varying(8) NOT NULL, "use_card_point" boolean NOT NULL, "card_type" character varying(32) NOT NULL, "owner_type" character varying(32) NOT NULL, "acquire_status" "public"."toss_payment_approve_card_acquire_status_enum" NOT NULL, "is_interest_free" boolean NOT NULL, "interest_payer" character varying(16) DEFAULT '', "toss_payment_approve_pk" integer NOT NULL, CONSTRAINT "REL_cf45294403d5405ed2e086c5e1" UNIQUE ("toss_payment_approve_pk"), CONSTRAINT "PK_c709f36265a5df4540548f8c225" PRIMARY KEY ("pk")); COMMENT ON COLUMN "toss_payment_approve_card"."pk" IS 'pk'; COMMENT ON COLUMN "toss_payment_approve_card"."amount" IS '결제 금액(즉시 할인 금액(discount.amount)이 포함)'; COMMENT ON COLUMN "toss_payment_approve_card"."issuer_code" IS '카드사 코드'; COMMENT ON COLUMN "toss_payment_approve_card"."acquirer_code" IS '카드 매입사 숫자 코드'; COMMENT ON COLUMN "toss_payment_approve_card"."number" IS '카드번호'; COMMENT ON COLUMN "toss_payment_approve_card"."installment_plan_months" IS '할부 개월 수'; COMMENT ON COLUMN "toss_payment_approve_card"."approve_no" IS '카드사 승인 번호'; COMMENT ON COLUMN "toss_payment_approve_card"."use_card_point" IS '카드사 포인트 사용 여부'; COMMENT ON COLUMN "toss_payment_approve_card"."card_type" IS '카드 종류'; COMMENT ON COLUMN "toss_payment_approve_card"."owner_type" IS '카드의 소유자 타입(개인, 법인, 미확인 중 하나'; COMMENT ON COLUMN "toss_payment_approve_card"."acquire_status" IS '카드 결제의 매입 상태'; COMMENT ON COLUMN "toss_payment_approve_card"."is_interest_free" IS '무이자 할부의 적용 여부'; COMMENT ON COLUMN "toss_payment_approve_card"."interest_payer" IS '할부가 적용된 결제에서 할부 수수료를 부담하는 주체'; COMMENT ON COLUMN "toss_payment_approve_card"."toss_payment_approve_pk" IS 'pk'`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_approve" ADD CONSTRAINT "FK_1fbc535314f938b7e9b3a261a26" FOREIGN KEY ("payment_pk") REFERENCES "payment"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_approve_card" ADD CONSTRAINT "FK_cf45294403d5405ed2e086c5e1a" FOREIGN KEY ("toss_payment_approve_pk") REFERENCES "toss_payment_approve"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "toss_payment_approve_card" DROP CONSTRAINT "FK_cf45294403d5405ed2e086c5e1a"`
    );
    await queryRunner.query(
      `ALTER TABLE "toss_payment_approve" DROP CONSTRAINT "FK_1fbc535314f938b7e9b3a261a26"`
    );
    await queryRunner.query(`DROP TABLE "toss_payment_approve_card"`);
    await queryRunner.query(`DROP TABLE "toss_payment_approve"`);
    await queryRunner.query(`DROP TYPE "public"."toss_payment_approve_card_acquire_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."toss_payment_approve_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."toss_payment_approve_status_enum"`);
  }
}
