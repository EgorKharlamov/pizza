import { Injectable } from '@nestjs/common';
import { Connection, In } from 'typeorm';
import IOrderRepository from '../Domain/Repositories/IOrderRepository';
import { Order, UniqueIdentifier } from '../Domain/types';
import { IAddress } from '../Domain/Entities/PartnerEntity';
import OrderEntity, { OrderStatusType } from '../Domain/Entities/OrderEntity';
import OrderOrm from '../Orm/Order.orm';
import OrderMapper from '../Mappers/OrderMapper';
import GoodsOrm from '../Orm/Goods.orm';

@Injectable()
export default class OrderRepository implements IOrderRepository {
  constructor(private connection: Connection) {}

  async createOrder(
    goodsIdsList: UniqueIdentifier[],
    address: IAddress,
    comment?: string,
    userId?: UniqueIdentifier
  ): Promise<OrderEntity> {
    const sum = await this.calculateOrderSum(goodsIdsList);
    const waitTime = await this.calculateWaitTime(goodsIdsList);

    const order = this.connection.manager.create(OrderOrm, {
      user_id: (userId as number) || -1,
      goods_list: JSON.stringify(goodsIdsList.map((el) => +el)),
      comment,
      address: JSON.stringify(address),
      status: OrderStatusType.active,
      sum: sum,
      wait_time: waitTime,
      date_order: new Date(),
    });
    await order.save();
    return OrderMapper.ormToDomain(order);
  }

  async findGoodsListByIdList(
    goodsIdsList: UniqueIdentifier[]
  ): Promise<GoodsOrm[]> {
    const pizzas = await this.connection.manager.find(GoodsOrm, {
      where: { id: In(goodsIdsList) },
    });
    return pizzas;
  }

  async calculateOrderSum(goodsIdsList: UniqueIdentifier[]): Promise<number> {
    const pizzas = await this.findGoodsListByIdList(goodsIdsList);
    let sum = 0;
    pizzas.forEach((el) => (sum += el.price));
    return Math.round(sum * 100) / 100;
  }

  async calculateWaitTime(goodsIdsList: UniqueIdentifier[]): Promise<number> {
    const pizzas = await this.findGoodsListByIdList(goodsIdsList);
    let time = 30;
    pizzas.forEach((el) => (time += el.difficult * 10));
    return time;
  }

  async getOrders(
    userId: UniqueIdentifier,
    page: number,
    limit: number,
    sort: Order,
    filterStatus?: OrderStatusType
  ): Promise<OrderEntity[]> {
    let filter = {};
    if (filterStatus) {
      filter = {
        status: filterStatus,
      };
    }
    const ordersList = await this.connection.manager.find(OrderOrm, {
      where: {
        user_id: userId,
      },
      order: {
        date_order: sort || Order.maxToMin,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return ordersList.map((el) => OrderMapper.ormToDomain(el));
  }
}
