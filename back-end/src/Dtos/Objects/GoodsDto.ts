import { ApiProperty } from '@nestjs/swagger';
import {
  GoodsDifficultType,
  TimeToOrderType,
} from '../../Domain/Entities/GoodsEntity';

export default class GoodsDto {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'enum', enum: GoodsDifficultType })
  difficult: GoodsDifficultType;

  @ApiProperty({ type: 'boolean' })
  inStock: boolean;

  @ApiProperty({ type: 'enum', enum: TimeToOrderType })
  timeToOrder: TimeToOrderType;

  @ApiProperty({ type: 'number' })
  orderTimes: number;

  @ApiProperty({ type: 'string' })
  imageUrl: string;
}
