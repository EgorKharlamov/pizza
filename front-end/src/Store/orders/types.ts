import { Order, OrderStatusType } from '../../Api/types';
import IGoods from '../goods/types';
import { IOrderDto } from '../../Api/Dto/Objects/IOrderDto';

export interface IOrderState {
  list: IOrderDto[]
  cart: IGoods[]
  page: number,
  limit: number,
  sort: Order,
  filter: OrderStatusType
}
