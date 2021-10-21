import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1634854086977 implements MigrationInterface {
    name = 'migration1634854086977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "email"`);
    }

}
