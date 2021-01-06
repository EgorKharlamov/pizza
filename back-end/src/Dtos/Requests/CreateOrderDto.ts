import { ApiProperty } from '@nestjs/swagger';
import { IAddress } from '../../Domain/Entities/PartnerEntity';
import { OrderStatusType } from '../../Domain/Entities/OrderEntity';
import { UniqueIdentifier } from '../../Domain/types';

class AddressDto {
  @ApiProperty({ type: 'string', required: true })
  street: string;
  @ApiProperty({ type: 'string', required: true })
  building: string;
  @ApiProperty({ type: 'number', required: true })
  room: number;
}

export default class CreateOrderDto {
  @ApiProperty({ type: [Number] })
  pizzas: number[];
  @ApiProperty({ type: 'string', required: false })
  comment?: string;
  @ApiProperty({ type: AddressDto, required: true })
  address: IAddress;
}
