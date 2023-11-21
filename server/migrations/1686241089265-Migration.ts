import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686241089265 implements MigrationInterface {
  name = "Migration1686241089265";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscribe" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "email" character varying(128) NOT NULL, "name" character varying(64) NOT NULL, "user_pk" integer NOT NULL, CONSTRAINT "REL_4d77642c02e1eed44a5b97a1f6" UNIQUE ("user_pk"), CONSTRAINT "PK_ac1ea535b75f93ca3cf6f723a62" PRIMARY KEY ("pk")); COMMENT ON COLUMN "subscribe"."create_at" IS '생성 일자'; COMMENT ON COLUMN "subscribe"."update_at" IS '수정 일자'; COMMENT ON COLUMN "subscribe"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "subscribe"."pk" IS 'pk'; COMMENT ON COLUMN "subscribe"."email" IS '이메일 주소'; COMMENT ON COLUMN "subscribe"."name" IS '이름'; COMMENT ON COLUMN "subscribe"."user_pk" IS '유저 외래키'`
    );
    await queryRunner.query(
      `CREATE TABLE "subscribe_history" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "body" text NOT NULL, CONSTRAINT "PK_44f3cb32010f02a96ef417e2feb" PRIMARY KEY ("pk")); COMMENT ON COLUMN "subscribe_history"."create_at" IS '생성 일자'; COMMENT ON COLUMN "subscribe_history"."update_at" IS '수정 일자'; COMMENT ON COLUMN "subscribe_history"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "subscribe_history"."pk" IS 'pk'; COMMENT ON COLUMN "subscribe_history"."title" IS '메일 제목'; COMMENT ON COLUMN "subscribe_history"."body" IS '메일 본문'`
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe" ADD CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscribe" DROP CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b"`
    );
    await queryRunner.query(`DROP TABLE "subscribe_history"`);
    await queryRunner.query(`DROP TABLE "subscribe"`);
  }
}
