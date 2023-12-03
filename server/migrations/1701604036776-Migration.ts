import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701604036776 implements MigrationInterface {
    name = 'Migration1701604036776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_type_enum" RENAME TO "user_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('LOCAL', 'GOOGLE', 'KAKAO', 'NAVER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" TYPE "public"."user_type_enum" USING "type"::"text"::"public"."user_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum_old" AS ENUM('LOCAL', 'GOOGLE', 'APPLE', 'KAKAO', 'NAVER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" TYPE "public"."user_type_enum_old" USING "type"::"text"::"public"."user_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_type_enum_old" RENAME TO "user_type_enum"`);
    }

}
