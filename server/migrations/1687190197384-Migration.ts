import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687190197384 implements MigrationInterface {
    name = 'Migration1687190197384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscribe_history_user" ("pk" SERIAL NOT NULL, "history_pk" integer, "user_pk" integer, CONSTRAINT "REL_4619a90c7426e5db9b64fdb37d" UNIQUE ("user_pk"), CONSTRAINT "PK_f6e2dccbc6f961653fc0a090847" PRIMARY KEY ("pk")); COMMENT ON COLUMN "subscribe_history_user"."pk" IS 'pk'; COMMENT ON COLUMN "subscribe_history_user"."history_pk" IS 'pk'; COMMENT ON COLUMN "subscribe_history_user"."user_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_22cc0ed962724c85a03a80363c2" FOREIGN KEY ("history_pk") REFERENCES "subscribe_history"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_22cc0ed962724c85a03a80363c2"`);
        await queryRunner.query(`DROP TABLE "subscribe_history_user"`);
    }

}
