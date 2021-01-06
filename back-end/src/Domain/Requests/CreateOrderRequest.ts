import { IAddress } from '../Entities/PartnerEntity';

export default class CreateOrderRequest {
  constructor(
    public pizzas: number[],
    public address: IAddress,
    public comment?: string
  ) {}
}
