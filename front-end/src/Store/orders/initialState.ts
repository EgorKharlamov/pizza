import { IOrderState } from './types';
import { Order, OrderStatusType } from '../../Api/types';

export const initialStateOrder: IOrderState = {
  list: [],
  cart: [],
  page: 1,
  limit: 10,
  sort: Order.maxToMin,
  filter: OrderStatusType.active,
};
