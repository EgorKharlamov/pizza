import { AnyAction } from 'redux';
import { initialStateToast } from './initialState';
import { ToastActions } from './actions';
import { IToastState } from './types';

export const toast = (state: IToastState = initialStateToast, action: AnyAction) => {
  switch (action.type) {
    case ToastActions.Type.ADD_TOAST:
      return { ...state, list: [...state.list, action.payload] };

    case ToastActions.Type.RM_BY_ID_TOAST:
      const newList = state.list.filter((el) => el.id !== action.payload);
      return { ...state, list: newList };
    default:
      return state;
  }
};
