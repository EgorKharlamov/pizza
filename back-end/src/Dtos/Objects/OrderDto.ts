import { ApiProperty } from '@nestjs/swagger';
import { IAddress } from '../../Domain/Entities/PartnerEntity';
import {
  IOrderPizza,
  OrderStatusType,
} from '../../Domain/Entities/OrderEntity';

class OrderPizzaDto {
  @ApiProperty({ type: 'number' })
  id: number;
  @ApiProperty({ type: 'number' })
  counts: number;
  @ApiProperty({ type: 'string' })
  name: string;
}

class AddressDto {
  @ApiProperty({ type: 'string' })
  street: string;
  @ApiProperty({ type: 'string' })
  building: string;
  @ApiProperty({ type: 'number' })
  room: number;
}

export default class OrderDto {
  @ApiProperty({ type: 'number' })
  id: number;
  @ApiProperty({ type: 'string' })
  phone: string;
  @ApiProperty({ type: [OrderPizzaDto] })
  pizzas: IOrderPizza[];
  @ApiProperty({ type: 'string', required: false })
  comment?: string;
  @ApiProperty({ type: AddressDto })
  address: IAddress;
  @ApiProperty({ type: 'number', enum: OrderStatusType })
  status: OrderStatusType;
  @ApiProperty({ type: 'number' })
  sum: number;
  @ApiProperty({ type: 'number' })
  waitTime: number;
  @ApiProperty({ type: Date })
  dateOrder: Date;
  @ApiProperty({ type: Date })
  dateComplete: Date;
}
