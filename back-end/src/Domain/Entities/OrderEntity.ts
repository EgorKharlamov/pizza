import BaseEntity from './BaseEntity';
import { UniqueIdentifier } from '../types';
import { IAddress } from './PartnerEntity';

export interface IOrderPizza {
  id: number;
  counts: number;
}

export enum OrderStatusType {
  active,
  cancelled,
  complete,
}
export default class OrderEntity extends BaseEntity<OrderEntity> {
  readonly id: UniqueIdentifier;
  userId: UniqueIdentifier;
  pizzas: IOrderPizza[];
  comment: string;
  sum: number;
  address: IAddress;
  status: OrderStatusType;
  waitTime: number;
  dateOrder: Date;
  dateComplete: Date;
}
