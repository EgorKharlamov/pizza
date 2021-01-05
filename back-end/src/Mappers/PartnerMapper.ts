import PartnerEntity, { Address } from '../Domain/Entities/PartnerEntity';
import PartnerDto from '../Dtos/Objects/PartnerDto';
import UserOrm from '../Orm/User.orm';

const addressParser = (address: string): Address => {
  const parsed: Address = JSON.parse(address);
  return parsed;
};

export default class PartnerMapper {
  static ormToDomain(orm: UserOrm): PartnerEntity {
    return PartnerEntity.new({
      id: orm.id,
      email: orm.email,
      password: orm.password,
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
      name: user.name,
      balance: user.balance,
      address: user.address,
      dateRegister: user.dateRegister,
      dateModify: user.dateModify,
    };
  }
}
