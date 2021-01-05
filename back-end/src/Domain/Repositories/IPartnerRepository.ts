import { UniqueIdentifier } from '../types';
import PartnerEntity from '../Entities/PartnerEntity';

export default interface IPartnerRepository {
  createUser(email: string, password: string): Promise<PartnerEntity>;

  findUserByEmail(email: string): Promise<PartnerEntity | undefined>;
  findUserById(id: UniqueIdentifier): Promise<PartnerEntity | undefined>;

  getOrdersHistory(userId: UniqueIdentifier): Promise<any>;
}
