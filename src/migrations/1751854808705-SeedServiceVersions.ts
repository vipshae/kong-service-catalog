import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedServiceVersions1751854808705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO service_versions (version, description, service)
      VALUES
        ('v1.0.0', 'Initial version of Service', 1),
        ('v1.1.0', 'Added 2FA support', 1),
        ('v2.0.0', 'Revamped token handling', 1),
        ('v1.0.0', 'Initial version of Payment Service', 2),
        ('v1.1.0', 'Added Stripe support', 2),
        ('v2.0.0', 'New billing logic', 2),
        ('v1.0.0', 'Added 2FA support', 3),
        ('v1.0.0', 'Inventory base version', 4),
        ('v1.1.0', 'Added stock alerts', 4),
        ('v2.0.0', 'Real-time sync', 4),
        ('v2.1.0', 'UI fixes and docs', 5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM service_versions`);
  }
}
