import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusType } from '../../Domain/Entities/OrderEntity';
import { Order } from '../../Domain/types';

export default class GetOrdersListDto {
  @ApiProperty({ type: 'number' })
  userId: number;

  @ApiProperty({ type: 'number', default: 1 })
  page: number;

  @ApiProperty({ type: 'number', default: 10 })
  limit: number;

  @ApiProperty({
    type: 'enum',
    enum: Order,
    default: Order.maxToMin,
    required: false,
  })
  sort: Order;

  @ApiProperty({
    type: 'enum',
    enum: OrderStatusType,
    required: false,
  })
  filter: OrderStatusType;
}
