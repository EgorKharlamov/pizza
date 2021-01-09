import React from 'react';
import { useSelector } from 'react-redux';
import Toast from './Toast';
import s from './ToastsContainer.module.scss';
import { IState } from '../Store';
import { IToastState } from '../Store/toast/types';

function ToastsContainer() {
  const toasts = useSelector<IState, IToastState>((state) => state.toast);

  return (
    <div className={s.container}>
      {toasts.list.map((toast) => (
        <Toast message={toast.message} type={toast.type} id={toast.id} key={toast.id} />
      ))}
    </div>
  );
}

export default ToastsContainer;
