import { UniqueIdentifier } from '../types';
import PartnerEntity from '../Entities/PartnerEntity';
import GoodsEntity from '../Entities/GoodsEntity';

export default interface IPartnerRepository {
  createUser(
    email: string,
    password: string,
    phone: string
  ): Promise<PartnerEntity>;

  findUserByEmail(email: string): Promise<PartnerEntity | undefined>;
  findUserById(id: UniqueIdentifier): Promise<PartnerEntity | undefined>;

  getGoods(): Promise<GoodsEntity[]>;
  getGoodById(id: number): Promise<GoodsEntity | undefined>;
}
