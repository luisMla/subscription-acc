import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1611484925515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: implenet your migrations query
    await queryRunner.query(``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: implement here your query
    // await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
