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
  CURRENCY_SWAP_TO_DOLLAR = 'CURRENCY_SWAP_TO_DOLLAR',
  CURRENCY_SWAP_TO_EURO = 'CURRENCY_SWAP_TO_EURO',
}

const signUp = createAction<ISignUpDto>(Type.SIGN_UP);
const signIn = createAction<ISignInDto>(Type.SIGN_IN);
const getUser = createAction<string>(Type.GET_USER);
const setUser = createAction<IUserState>(Type.SET_USER);
const logOut = createAction(Type.LOG_OUT);
const currencySwapToDollar = createAction(Type.CURRENCY_SWAP_TO_DOLLAR);
const currencySwapToEuro = createAction(Type.CURRENCY_SWAP_TO_EURO);

export const UserActions = {
  Type,

  signUp,
  signIn,
  getUser,
  setUser,
  logOut,
  currencySwapToDollar,
  currencySwapToEuro,
};

export type UserActionsType = Omit<typeof UserActions, 'Type'>
