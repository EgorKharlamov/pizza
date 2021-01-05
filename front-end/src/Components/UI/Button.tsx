import classNames from 'classnames';
import React from 'react';
import s from './Button.module.scss';

export interface IButton {
  label: string
  primary?: boolean
  secondary?: boolean
  clickFunc: Function
}

function Button({
  label, clickFunc, primary = true, secondary,
}: IButton) {
  const classButton = classNames({
    [s.primary]: primary,
    [s.secondary]: secondary,
    [s.button]: true,
  });

  return (
    <button
      type='button'
      className={classButton}
      onClick={() => clickFunc()}
    >
      {label}
    </button>
  );
}

export default Button;
