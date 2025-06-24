import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1750782246789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Etapa intermediária para evitar conflito de nomes
    await queryRunner.renameTable('courses', 'majors_temp');
    await queryRunner.renameTable('subjects', 'courses');
    await queryRunner.renameTable('majors_temp', 'majors');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter a ordem de forma segura
    await queryRunner.renameTable('majors', 'majors_temp');
    await queryRunner.renameTable('courses', 'subjects');
    await queryRunner.renameTable('majors_temp', 'courses');
  }
}
