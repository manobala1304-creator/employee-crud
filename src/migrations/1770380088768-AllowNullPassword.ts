import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowNullPassword1770380088768
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE [user]
      ALTER COLUMN [password] varchar(255) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE [user]
      ALTER COLUMN [password] varchar(255) NOT NULL`);
  }
}
