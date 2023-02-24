import { Injectable } from '@nestjs/common';
import PartnerRepository from '../../Repositories/PartnerRepository';
import { UniqueIdentifier } from '../../Domain/types';

@Injectable()
export class UsersService {
  constructor(public repository: PartnerRepository) {}

  async findOne(email: string) {
    return this.repository.findUserByEmail(email);
  }

  async findById(userId: number) {
    return this.repository.findUserById(userId);
  }
}
