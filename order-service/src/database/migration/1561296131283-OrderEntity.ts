import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderEntity1561296131283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "placeId" integer NOT NULL, "checkoutSlotId" integer NOT NULL, "statusId" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
