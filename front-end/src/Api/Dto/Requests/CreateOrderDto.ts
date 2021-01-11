import { IAddress } from '../../../Store/user/types';

export default interface CreateOrderDto {
  address: IAddress
  comment: string
  pizzas: number[]
  phone: string
  email: string
}
