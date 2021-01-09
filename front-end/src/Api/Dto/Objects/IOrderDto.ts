import { IAddress } from '../../../Store/user/types';
import { OrderStatusType } from '../../types';

export interface IOrderDto {
  id: number
  pizzas: IPizzaDto[]
  comment: string
  phone: string
  sum: number
  address: IAddress
  status: OrderStatusType
  waitTime: number
  dateOrder: Date
  dateComplete: Date
}

export interface IPizzaDto {
  id: number
  name: string
  counts: number
}
