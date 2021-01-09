import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatusType } from '../Domain/Entities/OrderEntity';
import UserOrm from './User.orm';
import { enumValues } from '../Domain/Helpers/Enums';

@Entity({ name: 'orders' })
export default class OrderOrm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'simple-json' })
  goods_list: string;

  @Column({ type: 'text', default: null })
  comment: string;

  @Column({ type: 'simple-json' })
  address: string;

  @Column({ type: 'enum', enum: enumValues(OrderStatusType) })
  status: OrderStatusType;

  @Column({ type: 'float', precision: 10, scale: 2 })
  sum: number;

  @Column({ type: 'int' })
  wait_time: number;

  @Column({ type: 'datetime' })
  date_order: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  date_complete: Date;
}
