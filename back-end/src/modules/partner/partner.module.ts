import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import PartnerRepository from '../../Repositories/PartnerRepository';

@Module({
  providers: [PartnerService, PartnerRepository],
  exports: [PartnerRepository],
})
export class PartnerModule {}
