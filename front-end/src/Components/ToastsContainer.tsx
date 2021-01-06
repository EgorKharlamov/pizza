import React from 'react';
// import Toast, { ToastType } from './Toast';
import s from './ToastsContainer.module.scss';

function ToastsContainer() {
  // const toasts = [
  //   { id: 0, message: 'Something wrong... asdf as dfas dfas df asdf asdf',
  //     type: ToastType.error },
  //   { id: 1, message: 'Success', type: ToastType.success }];
  return (
    <div className={s.container}>
      kek

      {/* {toasts.map((toast) => ( */}
      {/*  <Toast message={toast.message} type={toast.type} key={toast.id} /> */}
      {/* ))} */}
    </div>
  );
}

export default ToastsContainer;
