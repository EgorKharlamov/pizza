import { Injectable } from '@nestjs/common';
import PartnerRepository from '../../Repositories/PartnerRepository';
import CreatePartnerUseCase from '../../Domain/UseCases/CreatePartnerUseCase';
import GetGoodsUseCase from '../../Domain/UseCases/GetGoodsUseCase';
import GetGoodByIdUseCase from '../../Domain/UseCases/GetGoodByIdUseCase';

@Injectable()
export class PartnerService {
  constructor(private partnerRepository: PartnerRepository) {}

  getSignUpUseCase() {
    return new CreatePartnerUseCase(this.partnerRepository);
  }

  getGoodsUseCase() {
    return new GetGoodsUseCase(this.partnerRepository);
  }

  getGoodByIdUseCase() {
    return new GetGoodByIdUseCase(this.partnerRepository);
  }
}
