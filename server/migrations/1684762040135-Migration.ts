import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684762040135 implements MigrationInterface {
    name = 'Migration1684762040135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset" ("pk" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "content_type" character varying(64) NOT NULL, "uuid" character varying(64) NOT NULL, "url" character varying(256) NOT NULL, "download_url" character varying(256) NOT NULL, CONSTRAINT "PK_3053532ac24e42bb41ccc531979" PRIMARY KEY ("pk")); COMMENT ON COLUMN "asset"."pk" IS 'pk'; COMMENT ON COLUMN "asset"."name" IS '파일 이름'; COMMENT ON COLUMN "asset"."content_type" IS '확장자'; COMMENT ON COLUMN "asset"."uuid" IS 'uuid'; COMMENT ON COLUMN "asset"."url" IS 'url'; COMMENT ON COLUMN "asset"."download_url" IS '다운로드 url'`);
        await queryRunner.query(`CREATE TABLE "kakao_user" ("id" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "social_name" character varying(64) NOT NULL, "pk" integer NOT NULL, CONSTRAINT "UQ_6a65a95a8c861643880e44f6701" UNIQUE ("id"), CONSTRAINT "PK_d1f1dfee9d25621df2f4824fd78" PRIMARY KEY ("pk")); COMMENT ON COLUMN "kakao_user"."id" IS '카카오 아이디'; COMMENT ON COLUMN "kakao_user"."email" IS '카카오 이메일'; COMMENT ON COLUMN "kakao_user"."social_name" IS '닉네임'`);
        await queryRunner.query(`CREATE TABLE "naver_user" ("id" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "pk" integer NOT NULL, CONSTRAINT "PK_00bee5f74d92625e0b04f8c479e" PRIMARY KEY ("pk")); COMMENT ON COLUMN "naver_user"."id" IS '네이버 아이디'; COMMENT ON COLUMN "naver_user"."email" IS '네이버 이메일'`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('LOCAL', 'GOOGLE', 'APPLE', 'KAKAO', 'NAVER')`);
        await queryRunner.query(`CREATE TABLE "user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "phone" character varying(32), "type" "public"."user_type_enum" NOT NULL, CONSTRAINT "PK_3eb3660cb383b92582d5c3ecec2" PRIMARY KEY ("pk")); COMMENT ON COLUMN "user"."create_at" IS '생성 일자'; COMMENT ON COLUMN "user"."update_at" IS '수정 일자'; COMMENT ON COLUMN "user"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "user"."pk" IS 'pk'; COMMENT ON COLUMN "user"."name" IS '유저 이름'; COMMENT ON COLUMN "user"."phone" IS '유저 휴대폰'`);
        await queryRunner.query(`CREATE TABLE "local_user" ("id" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "password_hash" character varying(512) NOT NULL, "pk" integer NOT NULL, CONSTRAINT "PK_b37a39462de3d6d5fb65a5b847b" PRIMARY KEY ("pk")); COMMENT ON COLUMN "local_user"."id" IS '로그인 아이디'; COMMENT ON COLUMN "local_user"."email" IS '이메일'; COMMENT ON COLUMN "local_user"."password_hash" IS '비밀번호'`);
        await queryRunner.query(`CREATE TABLE "local_authentication" ("pk" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "ip" character varying(512) NOT NULL, "device" character varying(512) NOT NULL, "expired_at" date NOT NULL, "localUserPk" integer, CONSTRAINT "PK_ec8aa492dd84e653852266aecf7" PRIMARY KEY ("pk")); COMMENT ON COLUMN "local_authentication"."pk" IS 'pk'; COMMENT ON COLUMN "local_authentication"."token" IS '토큰 값'; COMMENT ON COLUMN "local_authentication"."ip" IS 'ip 값'; COMMENT ON COLUMN "local_authentication"."device" IS '디바이스 정보'; COMMENT ON COLUMN "local_authentication"."expired_at" IS '유효 기간'`);
        await queryRunner.query(`CREATE TABLE "google_authentication" ("pk" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "ip" character varying(512) NOT NULL, "device" character varying(512) NOT NULL, "expired_at" date NOT NULL, "googleUserPk" integer, CONSTRAINT "PK_f73952ebde3be7434203ce0c803" PRIMARY KEY ("pk")); COMMENT ON COLUMN "google_authentication"."pk" IS 'pk'; COMMENT ON COLUMN "google_authentication"."token" IS '토큰 값'; COMMENT ON COLUMN "google_authentication"."ip" IS 'ip 값'; COMMENT ON COLUMN "google_authentication"."device" IS '디바이스 정보'; COMMENT ON COLUMN "google_authentication"."expired_at" IS '유효 기간'`);
        await queryRunner.query(`CREATE TABLE "kakao_authentication" ("pk" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "ip" character varying(512) NOT NULL, "device" character varying(512) NOT NULL, "expired_at" date NOT NULL, "kakaoUserPk" integer, CONSTRAINT "PK_11ec946b3a711354b8f4862061e" PRIMARY KEY ("pk")); COMMENT ON COLUMN "kakao_authentication"."pk" IS 'pk'; COMMENT ON COLUMN "kakao_authentication"."token" IS '토큰 값'; COMMENT ON COLUMN "kakao_authentication"."ip" IS 'ip 값'; COMMENT ON COLUMN "kakao_authentication"."device" IS '디바이스 정보'; COMMENT ON COLUMN "kakao_authentication"."expired_at" IS '유효 기간'`);
        await queryRunner.query(`CREATE TABLE "naver_authentication" ("pk" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "ip" character varying(512) NOT NULL, "device" character varying(512) NOT NULL, "expired_at" date NOT NULL, "naverUserPk" integer, CONSTRAINT "PK_baa437dc004a3250bb26e230fb0" PRIMARY KEY ("pk")); COMMENT ON COLUMN "naver_authentication"."pk" IS 'pk'; COMMENT ON COLUMN "naver_authentication"."token" IS '토큰 값'; COMMENT ON COLUMN "naver_authentication"."ip" IS 'ip 값'; COMMENT ON COLUMN "naver_authentication"."device" IS '디바이스 정보'; COMMENT ON COLUMN "naver_authentication"."expired_at" IS '유효 기간'`);
        await queryRunner.query(`CREATE TABLE "google_user" ("sub" character varying(512) NOT NULL, "email" character varying(64) NOT NULL, "social_name" character varying(64) NOT NULL, "pk" integer NOT NULL, CONSTRAINT "PK_232ede5423536420b68155e19c8" PRIMARY KEY ("pk")); COMMENT ON COLUMN "google_user"."sub" IS 'google 유저 sub 아이디'; COMMENT ON COLUMN "google_user"."email" IS '구글 이메일'; COMMENT ON COLUMN "google_user"."social_name" IS '닉네임'`);
        await queryRunner.query(`CREATE TYPE "public"."manager_type_enum" AS ENUM('MANAGER', 'SUPER')`);
        await queryRunner.query(`CREATE TABLE "manager" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, "pk" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "email" character varying(128) NOT NULL, "id" character varying(128) NOT NULL, "password_hash" character varying(286) NOT NULL, "type" "public"."manager_type_enum" NOT NULL DEFAULT 'MANAGER', CONSTRAINT "PK_8e6fda0314b4133889e9d906a23" PRIMARY KEY ("pk")); COMMENT ON COLUMN "manager"."create_at" IS '생성 일자'; COMMENT ON COLUMN "manager"."update_at" IS '수정 일자'; COMMENT ON COLUMN "manager"."delete_at" IS '삭제 일자'; COMMENT ON COLUMN "manager"."pk" IS 'pk'; COMMENT ON COLUMN "manager"."name" IS '이름'; COMMENT ON COLUMN "manager"."email" IS '이메일'; COMMENT ON COLUMN "manager"."id" IS '로그인 아이디'; COMMENT ON COLUMN "manager"."password_hash" IS '비밀번호'; COMMENT ON COLUMN "manager"."type" IS '타입'`);
        await queryRunner.query(`CREATE TABLE "authentication" ("pk" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "ip" character varying(512) NOT NULL, "device" character varying(512) NOT NULL, "expired_at" date NOT NULL, "managerPk" integer, CONSTRAINT "PK_f8b91f260b225eaded4641b9116" PRIMARY KEY ("pk")); COMMENT ON COLUMN "authentication"."pk" IS 'pk'; COMMENT ON COLUMN "authentication"."token" IS '토큰 값'; COMMENT ON COLUMN "authentication"."ip" IS 'ip 값'; COMMENT ON COLUMN "authentication"."device" IS '디바이스 정보'; COMMENT ON COLUMN "authentication"."expired_at" IS '유효 기간'; COMMENT ON COLUMN "authentication"."managerPk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "kakao_user" ADD CONSTRAINT "FK_d1f1dfee9d25621df2f4824fd78" FOREIGN KEY ("pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "naver_user" ADD CONSTRAINT "FK_00bee5f74d92625e0b04f8c479e" FOREIGN KEY ("pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "local_user" ADD CONSTRAINT "FK_b37a39462de3d6d5fb65a5b847b" FOREIGN KEY ("pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "local_authentication" ADD CONSTRAINT "FK_c4190a86f43902c989c4f97c148" FOREIGN KEY ("localUserPk") REFERENCES "local_user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "google_authentication" ADD CONSTRAINT "FK_1da994f0b964232444345bbe0f0" FOREIGN KEY ("googleUserPk") REFERENCES "google_user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kakao_authentication" ADD CONSTRAINT "FK_f73ea955879ed3072549329f30b" FOREIGN KEY ("kakaoUserPk") REFERENCES "kakao_user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "naver_authentication" ADD CONSTRAINT "FK_e4a95b6b087839639f633faba79" FOREIGN KEY ("naverUserPk") REFERENCES "naver_user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "google_user" ADD CONSTRAINT "FK_232ede5423536420b68155e19c8" FOREIGN KEY ("pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authentication" ADD CONSTRAINT "FK_2320a1744bafab1859fa0253807" FOREIGN KEY ("managerPk") REFERENCES "manager"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentication" DROP CONSTRAINT "FK_2320a1744bafab1859fa0253807"`);
        await queryRunner.query(`ALTER TABLE "google_user" DROP CONSTRAINT "FK_232ede5423536420b68155e19c8"`);
        await queryRunner.query(`ALTER TABLE "naver_authentication" DROP CONSTRAINT "FK_e4a95b6b087839639f633faba79"`);
        await queryRunner.query(`ALTER TABLE "kakao_authentication" DROP CONSTRAINT "FK_f73ea955879ed3072549329f30b"`);
        await queryRunner.query(`ALTER TABLE "google_authentication" DROP CONSTRAINT "FK_1da994f0b964232444345bbe0f0"`);
        await queryRunner.query(`ALTER TABLE "local_authentication" DROP CONSTRAINT "FK_c4190a86f43902c989c4f97c148"`);
        await queryRunner.query(`ALTER TABLE "local_user" DROP CONSTRAINT "FK_b37a39462de3d6d5fb65a5b847b"`);
        await queryRunner.query(`ALTER TABLE "naver_user" DROP CONSTRAINT "FK_00bee5f74d92625e0b04f8c479e"`);
        await queryRunner.query(`ALTER TABLE "kakao_user" DROP CONSTRAINT "FK_d1f1dfee9d25621df2f4824fd78"`);
        await queryRunner.query(`DROP TABLE "authentication"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TYPE "public"."manager_type_enum"`);
        await queryRunner.query(`DROP TABLE "google_user"`);
        await queryRunner.query(`DROP TABLE "naver_authentication"`);
        await queryRunner.query(`DROP TABLE "kakao_authentication"`);
        await queryRunner.query(`DROP TABLE "google_authentication"`);
        await queryRunner.query(`DROP TABLE "local_authentication"`);
        await queryRunner.query(`DROP TABLE "local_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`DROP TABLE "naver_user"`);
        await queryRunner.query(`DROP TABLE "kakao_user"`);
        await queryRunner.query(`DROP TABLE "asset"`);
    }

}
