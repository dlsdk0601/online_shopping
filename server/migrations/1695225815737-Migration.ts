import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695225815737 implements MigrationInterface {
    name = 'Migration1695225815737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_54a9b272610c700f0c014407b32" UNIQUE ("purchase_pk")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_54a9b272610c700f0c014407b32" FOREIGN KEY ("purchase_pk") REFERENCES "purchase"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_54a9b272610c700f0c014407b32"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_54a9b272610c700f0c014407b32"`);
    }

}
