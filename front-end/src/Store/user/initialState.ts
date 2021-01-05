import { IUser } from './types';

export const initialStateUser: IUser = {
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
