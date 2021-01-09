import { CurrencyType, IUserState } from './types';

export const initialStateUser: IUserState = {
  id: -1,
  email: '',
  name: 'Guest',
  phone: '',
  address: {
    street: '',
    building: '',
    room: '',
  },
  currency: {
    current: CurrencyType.dollar,
    coefficient: 1,
  },
};
