import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1634856788869 implements MigrationInterface {
    name = 'migration1634856788869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "house-number" TO "house_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "house_number" TO "house-number"`);
    }

}
