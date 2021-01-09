import { AnyAction } from 'redux';
import { IOrderState } from './types';
import { initialStateOrder } from './initialState';
import { OrderActions } from './actions';
import { Cart } from '../../Helpers/LocalStorage/Cart';

export const order = (state: IOrderState = initialStateOrder, action: AnyAction) => {
  let cartGoodsList;
  switch (action.type) {
    case OrderActions.Type.ADD_GOOD_TO_CART:
      Cart.addToCart(action.payload);
      return { ...state, cart: state.cart.concat(action.payload) };
    case OrderActions.Type.RM_GOOD_FROM_CART:
      Cart.rmFromCart(action.payload);
      cartGoodsList = Cart.getGoodsList();
      if (cartGoodsList) {
        return { ...state, cart: [...cartGoodsList] };
      }
      return state;
    case OrderActions.Type.RM_ALL_ID_GOOD_FROM_CART:
      Cart.rmAllIdFromCart(action.payload);
      cartGoodsList = Cart.getGoodsList();
      if (cartGoodsList) {
        return { ...state, cart: [...cartGoodsList] };
      }
      return state;
    case OrderActions.Type.SET_GOODS_LIST_TO_CART:
      return { ...state, cart: state.cart.concat(action.payload) };
    case OrderActions.Type.CLEAR_GOODS_LIST:
      Cart.clearGoodsList();
      return { ...state, cart: [] };
    case OrderActions.Type.SET_ORDERS_HISTORY:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
