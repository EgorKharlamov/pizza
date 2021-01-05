import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import PartnerRepository from '../../Repositories/PartnerRepository';

@Module({
  providers: [UsersService, PartnerRepository],
  exports: [UsersService],
})
export class UsersModule {}
