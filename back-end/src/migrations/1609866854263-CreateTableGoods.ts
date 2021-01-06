import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableGoods1609866854263 implements MigrationInterface {
  name = 'CreateTableGoods1609866854263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `goods` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `description` text NOT NULL, `price` float(10,2) NOT NULL, `difficult` enum ('0', '1', '2', '3', '4') NOT NULL, `in_stock` tinyint NOT NULL, `time_to_order` enum ('0', '1', '2') NOT NULL, `order_times` int NOT NULL, `image_url` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `goods`');
  }
}
