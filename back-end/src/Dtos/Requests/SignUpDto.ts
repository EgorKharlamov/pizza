import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  pass: string;
}
