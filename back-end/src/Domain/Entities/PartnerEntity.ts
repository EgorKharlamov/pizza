import * as crypto from 'crypto';
import BaseEntity from './BaseEntity';
import { UniqueIdentifier } from '../types';

const passwordSalt = process.env.USER_PASS_SALT;

export interface IAddress {
  street: string;
  building: string;
  room: number;
}

export enum UserType {
  guest = 'guest',
  user = 'user',
}

export default class PartnerEntity extends BaseEntity<PartnerEntity> {
  static defaults = {
    name: UserType.guest,
    balance: 0,
  };

  readonly id: UniqueIdentifier;
  email: string;
  password: string;
  phone: number;
  name?: string = PartnerEntity.defaults.name;
  balance?: number = PartnerEntity.defaults.balance;
  address?: IAddress;
  dateRegister: Date;
  dateModify?: Date;

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  static hashPassword(password: string) {
    return crypto
      .createHash('md5')
      .update(password + passwordSalt)
      .digest('hex');
  }

  validatePassword(password: string) {
    return PartnerEntity.hashPassword(password) === this.password;
  }
}
