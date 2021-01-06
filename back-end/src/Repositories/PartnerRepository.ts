import { Injectable } from '@nestjs/common';
import IPartnerRepository from '../Domain/Repositories/IPartnerRepository';
import { Connection } from 'typeorm';
import { UniqueIdentifier } from '../Domain/types';
import PartnerEntity from '../Domain/Entities/PartnerEntity';
import UserOrm from '../Orm/User.orm';
import PartnerMapper from '../Mappers/PartnerMapper';
import GoodsOrm from '../Orm/Goods.orm';
import GoodsEntity from '../Domain/Entities/GoodsEntity';
import GoodsMapper from '../Mappers/GoodsMapper';

@Injectable()
export default class PartnerRepository implements IPartnerRepository {
  constructor(private connection: Connection) {}

  async createUser(
    email: string,
    password: string,
    phone: number
  ): Promise<PartnerEntity> {
    const user = this.connection.manager.create(UserOrm, {
      email,
      password,
      phone,
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

  async getGoods(): Promise<GoodsEntity[]> {
    const goods = await this.connection.manager.find(GoodsOrm);
    return goods.map((el) => GoodsMapper.ormToDomain(el));
  }
  async getGoodById(id: number): Promise<GoodsEntity | undefined> {
    const good = await this.connection.manager.findOne(GoodsOrm, {
      where: { id },
    });
    if (good) {
      return GoodsMapper.ormToDomain(good);
    }
  }
}
