import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedServices1751841360513 implements MigrationInterface {
  name = 'SeedServices1751841360513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO services (name, description) VALUES 
      ('gateway-service', 'Handles API GW'),
      ('payment-service', 'Processes payments'),
      ('admin-service', 'Manages admin tasks'),
      ('logger-service', 'Logs service activity'),
      ('user-service', 'Handles user info');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM services`);
  }
}
