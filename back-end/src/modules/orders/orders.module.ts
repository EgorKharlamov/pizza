import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import OrderRepository from '../../Repositories/OrderRepository';

@Module({
  providers: [OrdersService, OrderRepository],
  exports: [OrderRepository],
})
export class OrdersModule {}
