import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrders1610201981270 implements MigrationInterface {
  name = 'CreateTableOrders1610201981270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `phone` varchar(20) NOT NULL, `goods_list` text NOT NULL, `comment` text NULL DEFAULT NULL, `address` text NOT NULL, `status` enum ('0', '1', '2') NOT NULL, `sum` float(10,2) NOT NULL, `wait_time` int NOT NULL, `date_order` datetime NOT NULL, `date_complete` datetime NULL DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `orders`');
  }
}
