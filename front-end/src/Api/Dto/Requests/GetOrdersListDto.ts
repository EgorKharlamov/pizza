import { Order, OrderStatusType } from '../../types';

export default interface GetOrdersListDto {
  page: number;
  limit: number;
  sort?: Order;
  filter?: OrderStatusType;
}
