import PartnerEntity, { IAddress } from '../Domain/Entities/PartnerEntity';
import PartnerDto from '../Dtos/Objects/PartnerDto';
import UserOrm from '../Orm/User.orm';

export const addressParser = (address: string): IAddress => {
  const parsed: IAddress = JSON.parse(address);
  return parsed;
};

export default class PartnerMapper {
  static ormToDomain(orm: UserOrm): PartnerEntity {
    return PartnerEntity.new({
      id: orm.id,
      email: orm.email,
      password: orm.password,
      phone: orm.phone,
      name: orm.name,
      balance: orm.balance,
      address: orm.address ? addressParser(orm.address) : undefined,
      dateRegister: orm.date_register,
      dateModify: orm.date_modify,
    });
  }

  static domainToDto(user: PartnerEntity): PartnerDto {
    return {
      id: user.id as number,
      email: user.email,
      phone: user.phone,
      name: user.name,
      balance: user.balance,
      address: user.address,
      dateRegister: user.dateRegister,
      dateModify: user.dateModify,
    };
  }
}
