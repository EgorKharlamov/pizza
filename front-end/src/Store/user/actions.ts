import { createAction } from 'redux-actions';
import { IUserState } from './types';
import ISignUpDto from '../../Api/Dto/Requests/SignUpDto';
import ISignInDto from '../../Api/Dto/Requests/SignInDto';

enum Type {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  GET_USER = 'GET_USER',
  SET_USER = 'SET_USER',
  LOG_OUT = 'LOG_OUT',
}

const signUp = createAction<ISignUpDto>(Type.SIGN_UP);
const signIn = createAction<ISignInDto>(Type.SIGN_IN);
const getUser = createAction<string>(Type.GET_USER);
const setUser = createAction<IUserState>(Type.SET_USER);
const logOut = createAction(Type.LOG_OUT);

export const UserActions = {
  Type,

  signUp,
  signIn,
  getUser,
  setUser,
  logOut,
};

export type UserActionsType = Omit<typeof UserActions, 'Type'>
