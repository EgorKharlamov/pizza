import { IUserState } from './types';

export const initialStateUser: IUserState = {
  id: -1,
  email: '',
  name: 'Guest',
  phone: 0,
  address: {
    street: '',
    building: '',
    room: '',
  },
};
