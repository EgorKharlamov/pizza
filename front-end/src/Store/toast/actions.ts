import { createAction } from 'redux-actions';
import { IToast } from './types';

enum Type {
  ADD_TOAST = 'ADD_TOAST',
  RM_BY_ID_TOAST = 'RM_BY_ID_TOAST',
}

const addToast = createAction<IToast>(Type.ADD_TOAST);
const rmByIdToast = createAction<number|string>(Type.RM_BY_ID_TOAST);

export const ToastActions = {
  Type,

  addToast,
  rmByIdToast,
};

export type ToastActionsType = Omit<typeof ToastActions, 'Type'>
