import { AnyAction } from 'redux';
import Cookies from 'universal-cookie';
import { IUserState } from './types';
import { initialStateUser } from './initialState';
import { UserActions } from './actions';

export const user = (state: IUserState = initialStateUser, action: AnyAction) => {
  switch (action.type) {
    case UserActions.Type.SET_USER:
      return { ...state, ...action.payload };
    case UserActions.Type.LOG_OUT:
      clearCookie();
      return { ...initialStateUser };
    default:
      return state;
  }
};

const clearCookie = () => {
  const cookie = new Cookies();
  cookie.remove('auth');
};
