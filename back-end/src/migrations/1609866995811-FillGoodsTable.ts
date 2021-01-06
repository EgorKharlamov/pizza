import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillGoodsTable1609866995811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO goods(name, description, price, difficult, in_stock, time_to_order, order_times, image_url) VALUES ('Insane!', 'Very hot (very very very very hot!!!)', 6.66, '0', '1', '2', 100, 'link'), ('Whatsup guys???', 'Very strange pizza with frogs legs', 4.49, '1', '1', '0', 304, 'link'), ('NcBonald pizza', 'param pa pa paaaaaam, hehehehe', 2.19, '2', '1', '2', 230, 'link'), ('Simple pizza', 'Simple pizza, improve your armor by 10 points', 1.29, '3', '1', '0', 400, 'link'), ('Ice pizza', 'just from refrigerator, maybe you need a fire', 6.99, '4', '0', '1', 502, 'link'), ('Lorem pizza', 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem', 3.49, '3', '1', '1', 120, 'link'), ('Pizza', 'asdf', 2.99, '2', '1', '1', 110, 'link'), ('Pizza', 'asdf', 3.99, '4', '1', '2', 102, 'link')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `goods`');
  }
}
