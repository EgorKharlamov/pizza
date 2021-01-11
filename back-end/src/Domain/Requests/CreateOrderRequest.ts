import { IAddress } from '../Entities/PartnerEntity';

export default class CreateOrderRequest {
  constructor(
    public pizzas: number[],
    public address: IAddress,
    public phone: string,
    public email: string,
    public comment?: string
  ) {}
}
