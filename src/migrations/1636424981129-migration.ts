import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1636424981129 implements MigrationInterface {
    name = 'migration1636424981129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."PriorityEnum" AS ENUM('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'URGENT')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "priority" "public"."PriorityEnum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."PriorityEnum"`);
    }

}
