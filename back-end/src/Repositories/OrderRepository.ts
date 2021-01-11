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
    phone: string,
    email: string,
    comment?: string,
    userId?: UniqueIdentifier
  ): Promise<OrderEntity> {
    const sum = await this.calculateOrderSum(goodsIdsList);
    const waitTime = await this.calculateWaitTime(goodsIdsList);

    const goodsList: GoodsOrm[] = [];
    for (const goodsId of goodsIdsList) {
      const good = await this.findGoodById(goodsId);
      if (good) {
        goodsList.push(good);
      }
    }

    const order = this.connection.manager.create(OrderOrm, {
      user_id: (userId as number) || -1,
      phone,
      email,
      goods_list: JSON.stringify(goodsList.map((el) => el.name)),
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

  async findGoodById(id: UniqueIdentifier): Promise<GoodsOrm | undefined> {
    const pizza = await this.connection.manager.findOne(GoodsOrm, {
      where: { id },
    });
    if (pizza) {
      return pizza;
    }
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
    const goodsList: GoodsOrm[] = [];
    for (const goodsId of goodsIdsList) {
      const good = await this.findGoodById(goodsId);
      if (good) {
        goodsList.push(good);
      }
    }
    let sum = 0;
    const DELIVERY_PRICE = 5;
    goodsList.forEach((el) => (sum += el.price));
    return Math.round((sum + DELIVERY_PRICE) * 100) / 100;
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
