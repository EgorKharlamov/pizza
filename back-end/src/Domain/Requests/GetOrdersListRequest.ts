import { Order } from '../types';
import { OrderStatusType } from '../Entities/OrderEntity';

export default class GetOrdersListRequest {
  constructor(
    public page: number,
    public limit: number,
    public sort: Order,
    public filter: OrderStatusType
  ) {}
}
