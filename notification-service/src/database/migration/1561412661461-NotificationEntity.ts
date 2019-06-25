import {MigrationInterface, QueryRunner} from "typeorm";

export class NotificationEntity1561412661461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying(255) NOT NULL, "userId" integer NOT NULL, "pulled" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
