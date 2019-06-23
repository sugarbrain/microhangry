import {MigrationInterface, QueryRunner} from "typeorm";

export class PreferenceEntity1561319684099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "preference" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "placeCategoryId" integer NOT NULL, "checkoutSlotId" integer NOT NULL, CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "preference"`);
    }

}
