import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1637238379842 implements MigrationInterface {
    name = 'migration1637238379842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "customerId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f7f4a9b67057fe9d76166383587" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f7f4a9b67057fe9d76166383587"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
