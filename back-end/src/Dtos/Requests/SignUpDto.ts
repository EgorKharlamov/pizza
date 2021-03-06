import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  pass: string;
  @ApiProperty({ type: 'string' })
  passRepeat: string;
  @ApiProperty({ type: 'string' })
  phone: string;
}
