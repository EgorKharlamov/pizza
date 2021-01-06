import { createAction } from 'redux-actions';
import { ModalsType } from '../../types';

enum Type {
  MODAL_TOGGLE = 'MODAL_TOGGLE',
}

const modalToggle = createAction<ModalsType|null>(Type.MODAL_TOGGLE);

export const ModalActions = {
  Type,

  modalToggle,
};

export type ModalActionsType = Omit<typeof ModalActions, 'Type'>
