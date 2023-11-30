import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701359961061 implements MigrationInterface {
    name = 'Migration1701359961061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b"`);
        await queryRunner.query(`ALTER TABLE "subscribe" ALTER COLUMN "user_pk" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscribe"."user_pk" IS 'pk'`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b"`);
        await queryRunner.query(`COMMENT ON COLUMN "subscribe"."user_pk" IS '유저 외래키'`);
        await queryRunner.query(`ALTER TABLE "subscribe" ALTER COLUMN "user_pk" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "FK_4d77642c02e1eed44a5b97a1f6b" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
