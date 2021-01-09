import { IUserState } from './types';

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
};
