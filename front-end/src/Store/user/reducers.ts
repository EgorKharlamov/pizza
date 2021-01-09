import { AnyAction } from 'redux';
import { CurrencyType, IUserState } from './types';
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
    case UserActions.Type.CURRENCY_SWAP_TO_DOLLAR:
      return { ...state, currency: { current: CurrencyType.dollar, coefficient: 1 } };

    case UserActions.Type.CURRENCY_SWAP_TO_EURO:
      return { ...state, currency: { current: CurrencyType.euro, coefficient: 0.82 } };
    default:
      return state;
  }
};
