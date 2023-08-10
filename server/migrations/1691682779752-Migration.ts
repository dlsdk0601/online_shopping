import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691682779752 implements MigrationInterface {
    name = 'Migration1691682779752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2c94f412ca41b9087cc7b794709"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_6d18af48ffe2b555894ef1897d4"`);
        await queryRunner.query(`ALTER TABLE "purchase" RENAME COLUMN "userPk" TO "user_pk"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" RENAME COLUMN "purchasePk" TO "purchase_pk"`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "user_pk" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_fde3f23a50756bcc17ba0da1b24" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_01fbea4e752ff5e1cb96dfe0c9b" FOREIGN KEY ("purchase_pk") REFERENCES "purchase"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_01fbea4e752ff5e1cb96dfe0c9b"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_fde3f23a50756bcc17ba0da1b24"`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "user_pk" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_item" RENAME COLUMN "purchase_pk" TO "purchasePk"`);
        await queryRunner.query(`ALTER TABLE "purchase" RENAME COLUMN "user_pk" TO "userPk"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_6d18af48ffe2b555894ef1897d4" FOREIGN KEY ("purchasePk") REFERENCES "purchase"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2c94f412ca41b9087cc7b794709" FOREIGN KEY ("userPk") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
