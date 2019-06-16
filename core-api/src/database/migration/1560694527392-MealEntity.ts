import {MigrationInterface, QueryRunner} from "typeorm";

export class MealEntity1560694527392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "meal" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "placeId" integer, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_f1a5b4cd793bd6d82888ce2acc2" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_f1a5b4cd793bd6d82888ce2acc2"`);
        await queryRunner.query(`DROP TABLE "meal"`);
    }

}
