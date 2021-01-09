import { Inject, Injectable } from '@nestjs/common';
import OrderRepository from '../../Repositories/OrderRepository';
import CreateOrderUseCase from '../../Domain/UseCases/CreateOrderUseCase';
import GetOrdersListUseCase from '../../Domain/UseCases/GetOrdersListUseCase';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private orderRepository: OrderRepository
  ) {}

  getCreateOrderUseCase() {
    const user = this.req.user || { id: -1 };
    return new CreateOrderUseCase(this.orderRepository, user);
  }

  getGetOrdersListUseCase() {
    const user = this.req.user || { id: -1 };
    return new GetOrdersListUseCase(this.orderRepository, user);
  }
}
