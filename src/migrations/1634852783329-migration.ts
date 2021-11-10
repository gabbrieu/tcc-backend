import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1634852783329 implements MigrationInterface {
    name = 'migration1634852783329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."GenderEnum" AS ENUM('MASCULINO', 'FEMININO', 'NÃO INFORMADO')`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cellphone" character varying NOT NULL, "gender" "public"."GenderEnum" NOT NULL, "document" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "district" character varying NOT NULL, "house-number" integer NOT NULL, "description" text NOT NULL, "status" boolean NOT NULL, "birth_date" character varying NOT NULL, "column" integer NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TYPE "public"."GenderEnum"`);
    }

}
