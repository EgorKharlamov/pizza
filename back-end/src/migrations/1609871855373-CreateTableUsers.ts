import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUsers1609871855373 implements MigrationInterface {
    name = 'CreateTableUsers1609871855373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(30) NOT NULL, `password` varchar(80) NOT NULL, `phone` int NOT NULL, `balance` int NOT NULL DEFAULT '0', `name` varchar(20) NOT NULL DEFAULT '', `address` text NULL DEFAULT NULL, `date_register` datetime NOT NULL, `date_modify` datetime NULL DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
    }

}
