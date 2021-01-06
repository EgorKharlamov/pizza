import { Order, UniqueIdentifier } from '../types';
import OrderEntity, { OrderStatusType } from '../Entities/OrderEntity';
import { IAddress } from '../Entities/PartnerEntity';

export default interface IOrderRepository {
  createOrder(
    goodsIdsList: UniqueIdentifier[],
    address: IAddress,
    comment?: string,
    userId?: UniqueIdentifier
  ): Promise<OrderEntity>;

  getOrders(
    userId: UniqueIdentifier,
    page: number,
    limit: number,
    sort: Order,
    filterStatus: OrderStatusType
  ): Promise<OrderEntity[]>;
}
