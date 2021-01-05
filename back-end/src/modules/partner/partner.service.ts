import { Inject, Injectable } from '@nestjs/common';
import PartnerRepository from '../../Repositories/PartnerRepository';
import CreatePartnerUseCase from '../../Domain/UseCases/CreatePartnerUseCase';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PartnerService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private partnerRepository: PartnerRepository
  ) {}

  getSignUpUseCase() {
    return new CreatePartnerUseCase(this.partnerRepository);
  }
}
