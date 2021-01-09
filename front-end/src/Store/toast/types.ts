import { UniqueIdentifier } from '../../types';

export interface IToastState {
  list: IToast[],
}

export interface IToast {
  id: UniqueIdentifier
  type: ToastType
  message: string
}

export enum ToastType {
  success = 'success',
  error = 'error'
}
