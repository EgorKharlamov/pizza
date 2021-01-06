import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  GoodsDifficultType,
  TimeToOrderType,
} from '../Domain/Entities/GoodsEntity';
import { enumValues } from '../Domain/Helpers/Enums';

@Entity({ name: 'goods' })
export default class GoodsOrm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: enumValues(GoodsDifficultType) })
  difficult: GoodsDifficultType;

  @Column({ type: 'boolean' })
  in_stock: boolean;

  @Column({ type: 'enum', enum: enumValues(TimeToOrderType) })
  time_to_order: TimeToOrderType;

  @Column({ type: 'int' })
  order_times: number;

  @Column({ type: 'text' })
  image_url: string;
}
