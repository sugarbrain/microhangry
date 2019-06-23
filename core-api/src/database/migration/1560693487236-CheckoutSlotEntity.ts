import {MigrationInterface, QueryRunner} from "typeorm";

export class CheckoutSlotEntity1560693487236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "checkout_slot" ("id" SERIAL NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "softDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "placeId" integer, CONSTRAINT "PK_dc01014210fb3cbb87d8938459a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checkout_slot" ADD CONSTRAINT "FK_ba484fcbe905afffd6499fa52db" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "checkout_slot" DROP CONSTRAINT "FK_ba484fcbe905afffd6499fa52db"`);
        await queryRunner.query(`DROP TABLE "checkout_slot"`);
    }

}
