import { createAction } from 'redux-actions';
import IGoods from '../goods/types';
import CreateOrderDto from '../../Api/Dto/Requests/CreateOrderDto';
import { IOrderDto } from '../../Api/Dto/Objects/IOrderDto';

enum Type {
  ADD_GOOD_TO_CART = 'ADD_GOOD_TO_CART',
  RM_GOOD_FROM_CART = 'RM_GOOD_FROM_CART',
  RM_ALL_ID_GOOD_FROM_CART = 'RM_ALL_ID_GOOD_FROM_CART',
  SET_GOODS_LIST_TO_CART = 'SET_GOODS_LIST_TO_CART',
  CLEAR_GOODS_LIST = 'CLEAR_GOODS_LIST',
  SEND_ORDER = 'SEND_ORDER',
  GET_ORDERS_HISTORY = 'GET_ORDERS_HISTORY',
  SET_ORDERS_HISTORY = 'SET_ORDERS_HISTORY',
}

const addGoodToCart = createAction<IGoods>(Type.ADD_GOOD_TO_CART);
const rmGoodFromCart = createAction<number>(Type.RM_GOOD_FROM_CART);
const rmAllIdGoodFromCart = createAction<number>(Type.RM_ALL_ID_GOOD_FROM_CART);
const setGoodsListToCart = createAction<IGoods[]>(Type.SET_GOODS_LIST_TO_CART);
const clearGoodsList = createAction(Type.CLEAR_GOODS_LIST);
const sendOrder = createAction<CreateOrderDto>(Type.SEND_ORDER);
const getOrdersHistory = createAction(Type.GET_ORDERS_HISTORY);
const setOrdersHistory = createAction<IOrderDto[]>(Type.SET_ORDERS_HISTORY);

export const OrderActions = {
  Type,

  addGoodToCart,
  rmGoodFromCart,
  rmAllIdGoodFromCart,
  setGoodsListToCart,
  clearGoodsList,
  sendOrder,
  getOrdersHistory,
  setOrdersHistory,
};

export type OrderActionsType = Omit<typeof OrderActions, 'Type'>
