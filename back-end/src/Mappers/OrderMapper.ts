import OrderEntity, { IOrderPizza } from '../Domain/Entities/OrderEntity';
import OrderDto from '../Dtos/Objects/OrderDto';
import OrderOrm from '../Orm/Order.orm';
import { addressParser } from './PartnerMapper';

const pizzaParser = (pizzasIdList: string[]) => {
  const pizzasObj: Record<string, number> = {};
  pizzasIdList.forEach((el: any) => {
    if (!pizzasObj[el]) {
      pizzasObj[el] = 1;
    } else pizzasObj[el] += 1;
  });
  const result: IOrderPizza[] = [];
  Object.keys(pizzasObj).forEach((key) => {
    result.push({ name: key, counts: pizzasObj[key] });
  });
  return result;
};

export default class OrderMapper {
  static ormToDomain(orm: OrderOrm): OrderEntity {
    return OrderEntity.new({
      id: orm.id,
      phone: orm.phone,
      userId: orm.user_id as number,
      pizzas: pizzaParser(JSON.parse(orm.goods_list)),
      comment: orm.comment,
      sum: orm.sum,
      address: addressParser(orm.address),
      status: orm.status,
      waitTime: orm.wait_time,
      dateOrder: orm.date_order,
      dateComplete: orm.date_complete,
    });
  }

  static domainToDto(order: OrderEntity): OrderDto {
    return {
      id: order.id as number,
      phone: order.phone,
      pizzas: order.pizzas,
      comment: order.comment,
      address: order.address,
      status: order.status,
      sum: order.sum,
      waitTime: order.waitTime,
      dateOrder: order.dateOrder,
      dateComplete: order.dateComplete,
    };
  }

  static domainsListToDto(list: OrderEntity[]): OrderDto[] {
    return list.map((el) => this.domainToDto(el));
  }
}
