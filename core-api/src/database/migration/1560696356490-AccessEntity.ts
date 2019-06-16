import {MigrationInterface, QueryRunner} from "typeorm";

export class AccessEntity1560696356490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "access" ("id" SERIAL NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "placeId" integer, "permissionId" integer, CONSTRAINT "REL_fae56b55bdddaf7d30f3baa25a" UNIQUE ("permissionId"), CONSTRAINT "PK_e386259e6046c45ab06811584ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_6e34c980647d3db8ea3455046cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_2c8f0e31efd2183c1944f7fc91e" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_fae56b55bdddaf7d30f3baa25a1" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_fae56b55bdddaf7d30f3baa25a1"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_2c8f0e31efd2183c1944f7fc91e"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_6e34c980647d3db8ea3455046cb"`);
        await queryRunner.query(`DROP TABLE "access"`);
    }

}
