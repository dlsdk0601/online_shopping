import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687446067716 implements MigrationInterface {
    name = 'Migration1687446067716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0ca9a9f50b6853e26e5cfe5a8da"`);
        await queryRunner.query(`CREATE TABLE "subscribe_history_user" ("pk" SERIAL NOT NULL, CONSTRAINT "PK_f6e2dccbc6f961653fc0a090847" PRIMARY KEY ("pk")); COMMENT ON COLUMN "subscribe_history_user"."pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "subscribePk"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "subscribePk" integer`);
        await queryRunner.query(`DROP TABLE "subscribe_history_user"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0ca9a9f50b6853e26e5cfe5a8da" FOREIGN KEY ("subscribePk") REFERENCES "subscribe_history"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
