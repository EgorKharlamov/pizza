import React from 'react';
import classNames from 'classnames';
import s from './Toast.module.scss';

export interface IToast {
  message: string
  type: ToastType
}
export enum ToastType {
  success = 'success',
  error = 'error'
}

function Toast({ message, type }: IToast) {
  const toastClasses = classNames({
    [s[type]]: type,
    [s.toast]: true,
  });
  return (
    <div className={s.toastContainer}>
      <div className={toastClasses}>
        <p className={s.text}>{message}</p>
      </div>
    </div>
  );
}

export default Toast;
