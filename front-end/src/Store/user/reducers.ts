import { AnyAction } from 'redux';
import { IUser } from './types';
import { initialStateUser } from './initialState';
import { UserActions } from './actions';

export const user = (state: IUser = initialStateUser, action: AnyAction) => {
  switch (action.type) {
    case UserActions.setUser:
      return { ...state, ...action.payload };
    case UserActions.logOut:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
