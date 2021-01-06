import { AnyAction } from 'redux';
import { IGoodsState } from './types';
import { initialStateGoods } from './initialState';
import { GoodActions } from './actions';

export const good = (state: IGoodsState = initialStateGoods, action: AnyAction) => {
  switch (action.type) {
    case GoodActions.Type.SET_GOODS_LIST:
      return { ...state, list: [...action.payload] };
    case GoodActions.Type.SET_CHOSEN_GOOD:
      return { ...state, chosen: { ...action.payload } };
    default:
      return state;
  }
};
