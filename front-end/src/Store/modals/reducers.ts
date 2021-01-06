import { AnyAction } from 'redux';
import { initialStateModal } from './initialState';
import { ModalActions } from './actions';
import { IModalState } from './types';

export const modal = (state: IModalState = initialStateModal, action: AnyAction) => {
  switch (action.type) {
    case ModalActions.Type.MODAL_TOGGLE:
      if ((state.type === action.payload && state.showed) || (action.payload === null)) {
        return { ...initialStateModal };
      }
      return { ...state, type: action.payload, showed: true };
    default:
      return state;
  }
};
