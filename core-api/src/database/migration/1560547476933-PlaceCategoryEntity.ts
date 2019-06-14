import {MigrationInterface, QueryRunner} from "typeorm";

export class PlaceCategoryEntity1560547476933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place_category" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a9a0f535f8481c45d83c280296" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "place_category"`);
    }

}
