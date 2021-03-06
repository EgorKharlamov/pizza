import { ApiProperty } from '@nestjs/swagger';
import { IAddress } from '../../Domain/Entities/PartnerEntity';

class AddressDto {
  @ApiProperty({ type: 'string' })
  street: string;
  @ApiProperty({ type: 'string' })
  building: string;
  @ApiProperty({ type: 'number' })
  room: number;
}

export default class PartnerDto {
  @ApiProperty({ type: 'number' })
  id: number;
  @ApiProperty({ type: 'string' })
  email: string;
  @ApiProperty({ type: 'string' })
  phone: string;
  @ApiProperty({ type: 'number', required: false })
  balance?: number;
  @ApiProperty({ type: 'string', required: false })
  name?: string;
  @ApiProperty({ type: AddressDto, required: false })
  address?: IAddress;
  @ApiProperty({ type: Date })
  dateRegister: Date;
  @ApiProperty({ type: Date, required: false })
  dateModify?: Date;
}
