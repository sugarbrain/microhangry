import {MigrationInterface, QueryRunner} from "typeorm";

export class PlaceEntity1560305011394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "category_id" integer NOT NULL, "address" character varying(64) NOT NULL, "phone" character varying(12) NOT NULL, "description" character varying(255) NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "place"`);
    }

}
