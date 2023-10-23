import { MigrationInterface, QueryRunner } from "typeorm";

export class Path1698009629964 implements MigrationInterface {
    name = 'Path1698009629964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" integer NOT NULL, "type" integer NOT NULL, "expires" datetime NOT NULL DEFAULT (NOW()), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_user_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" integer NOT NULL, "type" integer NOT NULL, "expires" datetime NOT NULL DEFAULT (NOW()), "userId" integer, CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_token"("id", "user", "type", "expires", "userId") SELECT "id", "user", "type", "expires", "userId" FROM "user_token"`);
        await queryRunner.query(`DROP TABLE "user_token"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_token" RENAME TO "user_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_token" RENAME TO "temporary_user_token"`);
        await queryRunner.query(`CREATE TABLE "user_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" integer NOT NULL, "type" integer NOT NULL, "expires" datetime NOT NULL DEFAULT (NOW()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "user_token"("id", "user", "type", "expires", "userId") SELECT "id", "user", "type", "expires", "userId" FROM "temporary_user_token"`);
        await queryRunner.query(`DROP TABLE "temporary_user_token"`);
        await queryRunner.query(`DROP TABLE "user_token"`);
    }

}
