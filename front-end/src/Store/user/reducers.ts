import { AnyAction } from 'redux';
import { IUserState } from './types';
import { initialStateUser } from './initialState';
import { UserActions } from './actions';
import { Auth } from '../../Helpers/LocalStorage/Auth';

export const user = (state: IUserState = initialStateUser, action: AnyAction) => {
  switch (action.type) {
    case UserActions.Type.SET_USER:
      return { ...state, ...action.payload };
    case UserActions.Type.LOG_OUT:
      Auth.dropAuth();
      return { ...initialStateUser };
    default:
      return state;
  }
};
