import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1636157158530 implements MigrationInterface {
    name = 'migration1636157158530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "house_number"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "house_number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "house_number"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "house_number" integer NOT NULL`);
    }

}
