import { Order, OrderStatusType } from '../../types';

export default interface GetOrdersListDto {
  userId: number;
  page: number;
  limit: number;
  sort: Order;
  filter: OrderStatusType;
}
