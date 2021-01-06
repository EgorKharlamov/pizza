import { createAction } from 'redux-actions';
import IGetGoodByIdDto from '../../Api/Dto/Requests/GetGoodByIdDto';
import IGoods from './types';

enum Type {
  GET_GOODS_LIST = 'GET_GOODS_LIST',
  GET_GOOD_BY_ID = 'GET_GOOD_BY_ID',
  SET_GOODS_LIST = 'SET_GOODS_LIST',
  SET_CHOSEN_GOOD = 'SET_CHOSEN_GOOD',
}

const getGoodsList = createAction(Type.GET_GOODS_LIST);
const getGoodById = createAction<IGetGoodByIdDto>(Type.GET_GOOD_BY_ID);
const setGoodsList = createAction<IGoods[]>(Type.SET_GOODS_LIST);
const setChosenGood = createAction(Type.SET_CHOSEN_GOOD);

export const GoodActions = {
  Type,

  getGoodsList,
  getGoodById,
  setGoodsList,
  setChosenGood,
};

export type GoodActionsType = Omit<typeof GoodActions, 'Type'>
