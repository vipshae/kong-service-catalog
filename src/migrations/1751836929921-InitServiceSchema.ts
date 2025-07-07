import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitServiceSchema1751836929921 implements MigrationInterface {
  name = 'InitServiceSchema1751836929921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service_versions" ("id" SERIAL NOT NULL, "version" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "serviceId" integer, CONSTRAINT "PK_2cdf123a2486f00862495e81101" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
      CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE ("name"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
    await queryRunner.query(
      `ALTER TABLE "service_versions" ADD CONSTRAINT "FK_b94e0f41ebbfefd949ac1f0f60e" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_versions" DROP CONSTRAINT "FK_b94e0f41ebbfefd949ac1f0f60e"`,
    );
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "service_versions"`);
  }
}
