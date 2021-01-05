import { ApiProperty } from '@nestjs/swagger';

export default class SignInDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  pass: string;
}
