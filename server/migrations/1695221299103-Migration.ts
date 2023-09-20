import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695221299103 implements MigrationInterface {
    name = 'Migration1695221299103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."toss_payment_callback_status_enum" AS ENUM('PAY_STANDBY', 'PAY_APPROVED', 'PAY_CANCEL', 'PAY_PROGRESS', 'PAY_COMPLETE', 'REFUND_PROGRESS', 'REFUND_SUCCESS', 'SETTLEMENT_COMPLETE', 'SETTLEMENT_REFUND_COMPLETE')`);
        await queryRunner.query(`CREATE TYPE "public"."toss_payment_callback_pay_method_enum" AS ENUM('TOSS_MONEY', 'CARD')`);
        await queryRunner.query(`CREATE TYPE "public"."toss_payment_callback_card_method_type_enum" AS ENUM('CREDIT', 'CHECK', 'PREPAYMENT')`);
        await queryRunner.query(`CREATE TABLE "toss_payment_callback" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "status" "public"."toss_payment_callback_status_enum" NOT NULL, "pay_token" character varying(32) NOT NULL, "order_no" character varying(64) NOT NULL, "pay_method" "public"."toss_payment_callback_pay_method_enum" NOT NULL, "amount" integer NOT NULL, "discounted_amount" integer NOT NULL, "paid_amount" integer NOT NULL, "paid_ts" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_id" character varying(64) NOT NULL, "card_company_code" integer, "card_authorization_no" character varying(8) NOT NULL DEFAULT '', "spread_out" character varying(8) NOT NULL DEFAULT '', "no_interest" boolean, "card_method_type" "public"."toss_payment_callback_card_method_type_enum", "card_number" character varying(32) NOT NULL DEFAULT '', "sales_check_link_url" character varying(256) NOT NULL DEFAULT '', CONSTRAINT "PK_ba664527a1de1acb4219687091d" PRIMARY KEY ("pk")); COMMENT ON COLUMN "toss_payment_callback"."create_at" IS '생성 일자'; COMMENT ON COLUMN "toss_payment_callback"."update_at" IS '수정 일자'; COMMENT ON COLUMN "toss_payment_callback"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "toss_payment_callback"."pk" IS 'pk'; COMMENT ON COLUMN "toss_payment_callback"."status" IS '결제 완료, 환불 등 ''결제 완료'' 이외 상태는 전달되지 않습니다.'; COMMENT ON COLUMN "toss_payment_callback"."pay_token" IS '승인된 결제 토큰'; COMMENT ON COLUMN "toss_payment_callback"."order_no" IS '결제생성 구간에서 전달된 가맹점 주문번호'; COMMENT ON COLUMN "toss_payment_callback"."pay_method" IS '승인된 결제수단'; COMMENT ON COLUMN "toss_payment_callback"."amount" IS '결제요청된 금액'; COMMENT ON COLUMN "toss_payment_callback"."discounted_amount" IS '할인된 금액'; COMMENT ON COLUMN "toss_payment_callback"."paid_amount" IS '지불수단 승인금액'; COMMENT ON COLUMN "toss_payment_callback"."paid_ts" IS '결제 완료 처리 시간'; COMMENT ON COLUMN "toss_payment_callback"."transaction_id" IS '거래 트랜잭션 아이디'; COMMENT ON COLUMN "toss_payment_callback"."card_company_code" IS '승인된 카드사 코드'; COMMENT ON COLUMN "toss_payment_callback"."card_authorization_no" IS '카드 승인번호'; COMMENT ON COLUMN "toss_payment_callback"."spread_out" IS '사용자가 선택한 카드 할부개월'; COMMENT ON COLUMN "toss_payment_callback"."no_interest" IS '카드 무이자 적용 여부'; COMMENT ON COLUMN "toss_payment_callback"."card_method_type" IS '카드 타입'; COMMENT ON COLUMN "toss_payment_callback"."card_number" IS '마스킹된 카드번호'; COMMENT ON COLUMN "toss_payment_callback"."sales_check_link_url" IS '신용카드 매출전표 호출URL'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."toss_payment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "code" integer NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."code" IS '응답 코드'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "checkoutPage" character varying(256) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."checkoutPage" IS '결제를 진행할 수 있는 토스페이 웹페이지 URL'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "msg" character varying(128) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."msg" IS '응답이 성공이 아닌 경우 설명 메세지'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "errorCode" character varying(64) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."errorCode" IS '에러 코드'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "pay_token"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "pay_token" character varying(30) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."pay_token" IS '거래를 구분할 수 있는 토스 고유 값'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."pay_token" IS '거래를 구분할 수 있는 토스 고유 값'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "pay_token"`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "pay_token" character varying(128) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."errorCode" IS '에러 코드'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "errorCode"`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."msg" IS '응답이 성공이 아닌 경우 설명 메세지'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "msg"`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."checkoutPage" IS '결제를 진행할 수 있는 토스페이 웹페이지 URL'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "checkoutPage"`);
        await queryRunner.query(`COMMENT ON COLUMN "toss_payment"."code" IS '응답 코드'`);
        await queryRunner.query(`ALTER TABLE "toss_payment" DROP COLUMN "code"`);
        await queryRunner.query(`CREATE TYPE "public"."toss_payment_status_enum" AS ENUM('SUCCESS', 'FAIL')`);
        await queryRunner.query(`ALTER TABLE "toss_payment" ADD "status" "public"."toss_payment_status_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "toss_payment_callback"`);
        await queryRunner.query(`DROP TYPE "public"."toss_payment_callback_card_method_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."toss_payment_callback_pay_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."toss_payment_callback_status_enum"`);
    }

}
