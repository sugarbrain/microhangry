import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderItems1561396618110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "mealId" integer NOT NULL, "quantity" integer NOT NULL, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}
