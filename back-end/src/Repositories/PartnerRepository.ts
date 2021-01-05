import { Injectable } from '@nestjs/common';
import IPartnerRepository from '../Domain/Repositories/IPartnerRepository';
import { Connection } from 'typeorm';
import { UniqueIdentifier } from '../Domain/types';
import PartnerEntity from '../Domain/Entities/PartnerEntity';
import UserOrm from '../Orm/User.orm';
import PartnerMapper from '../Mappers/PartnerMapper';

@Injectable()
export default class PartnerRepository implements IPartnerRepository {
  constructor(private connection: Connection) {}

  async createUser(email: string, password: string): Promise<PartnerEntity> {
    const user = this.connection.manager.create(UserOrm, {
      email,
      password,
      date_register: new Date(),
    });
    await user.save();
    return PartnerMapper.ormToDomain(user);
  }

  async findUserByEmail(email: string): Promise<PartnerEntity | undefined> {
    const user = await this.connection.manager.findOne(UserOrm, {
      where: { email },
    });
    if (user) {
      return PartnerMapper.ormToDomain(user);
    }
  }
  async findUserById(id: UniqueIdentifier): Promise<PartnerEntity | undefined> {
    const user = await this.connection.manager.findOne(UserOrm, {
      where: { id },
    });
    if (user) {
      return PartnerMapper.ormToDomain(user);
    }
  }

  async getOrdersHistory(userId: UniqueIdentifier): Promise<any> {
    return '';
  }
}
