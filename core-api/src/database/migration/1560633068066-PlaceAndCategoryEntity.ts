import {MigrationInterface, QueryRunner} from "typeorm";

export class PlaceAndCategoryEntity1560633068066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place_category" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a9a0f535f8481c45d83c280296" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "address" character varying(64) NOT NULL, "phone" character varying(12) NOT NULL, "description" character varying(255) NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_4a3c2427bea45ebc6a549887663" FOREIGN KEY ("categoryId") REFERENCES "place_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_4a3c2427bea45ebc6a549887663"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "place_category"`);
    }

}
