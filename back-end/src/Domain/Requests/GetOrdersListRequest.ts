import { Order, UniqueIdentifier } from '../types';
import { OrderStatusType } from '../Entities/OrderEntity';

export default class GetOrdersListRequest {
  constructor(
    public userId: UniqueIdentifier,
    public page: number,
    public limit: number,
    public sort: Order,
    public filter: OrderStatusType
  ) {}
}
