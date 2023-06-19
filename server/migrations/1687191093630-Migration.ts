import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687191093630 implements MigrationInterface {
    name = 'Migration1687191093630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_22cc0ed962724c85a03a80363c2"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "UQ_22cc0ed962724c85a03a80363c2" UNIQUE ("history_pk")`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "REL_4619a90c7426e5db9b64fdb37d"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_22cc0ed962724c85a03a80363c2" FOREIGN KEY ("history_pk") REFERENCES "subscribe_history"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "FK_22cc0ed962724c85a03a80363c2"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "REL_4619a90c7426e5db9b64fdb37d" UNIQUE ("user_pk")`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" DROP CONSTRAINT "UQ_22cc0ed962724c85a03a80363c2"`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_4619a90c7426e5db9b64fdb37de" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribe_history_user" ADD CONSTRAINT "FK_22cc0ed962724c85a03a80363c2" FOREIGN KEY ("history_pk") REFERENCES "subscribe_history"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
