import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688651620347 implements MigrationInterface {
    name = 'Migration1688651620347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."main_banner_category_enum" AS ENUM('MEN', 'WOMEN', 'KIDS', 'ACCESSORY')`);
        await queryRunner.query(`CREATE TABLE "main_banner" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "title" character varying(128) NOT NULL, "sub_title" character varying(256) NOT NULL, "description" text, "category" "public"."main_banner_category_enum" NOT NULL, "image_pk" integer NOT NULL, CONSTRAINT "PK_e002a439b776bf36eb6bced2689" PRIMARY KEY ("pk")); COMMENT ON COLUMN "main_banner"."create_at" IS '생성 일자'; COMMENT ON COLUMN "main_banner"."update_at" IS '수정 일자'; COMMENT ON COLUMN "main_banner"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "main_banner"."pk" IS 'pk'; COMMENT ON COLUMN "main_banner"."title" IS '배너 제목'; COMMENT ON COLUMN "main_banner"."sub_title" IS '배너 서브 제목'; COMMENT ON COLUMN "main_banner"."description" IS '배너 설명'; COMMENT ON COLUMN "main_banner"."category" IS '카테고리'; COMMENT ON COLUMN "main_banner"."image_pk" IS 'pk'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "main_banner"`);
        await queryRunner.query(`DROP TYPE "public"."main_banner_category_enum"`);
    }

}
