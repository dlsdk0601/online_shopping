import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691678624400 implements MigrationInterface {
    name = 'Migration1691678624400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase" ("pk" SERIAL NOT NULL, "userPk" integer, CONSTRAINT "PK_385c5760ca738c4c523e13b5b22" PRIMARY KEY ("pk")); COMMENT ON COLUMN "purchase"."pk" IS 'pk'; COMMENT ON COLUMN "purchase"."userPk" IS 'pk'`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_item_status_enum" AS ENUM('WAITING', 'IN_PROGRESS', 'SUCCESS', 'CANCEL', 'REFUND_WAITING', 'REFUND_SUCCESS', 'REFUND_FAIL', 'FAIL')`);
        await queryRunner.query(`CREATE TABLE "purchase_item" ("pk" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "status" "public"."purchase_item_status_enum" NOT NULL, "purchasePk" integer, CONSTRAINT "PK_8c48718bba5353ecf91714bb65f" PRIMARY KEY ("pk")); COMMENT ON COLUMN "purchase_item"."pk" IS 'pk'; COMMENT ON COLUMN "purchase_item"."create_at" IS '생성 일자'; COMMENT ON COLUMN "purchase_item"."update_at" IS '수정 일자'; COMMENT ON COLUMN "purchase_item"."purchasePk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2c94f412ca41b9087cc7b794709" FOREIGN KEY ("userPk") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_6d18af48ffe2b555894ef1897d4" FOREIGN KEY ("purchasePk") REFERENCES "purchase"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_6d18af48ffe2b555894ef1897d4"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2c94f412ca41b9087cc7b794709"`);
        await queryRunner.query(`DROP TABLE "purchase_item"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_item_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
    }

}
