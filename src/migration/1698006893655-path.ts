import { MigrationInterface, QueryRunner } from "typeorm";

export class Path1698006893655 implements MigrationInterface {
    name = 'Path1698006893655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(32) NOT NULL, "activated" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
