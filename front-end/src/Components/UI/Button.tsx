import classNames from 'classnames';
import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Button.module.scss';

export interface IButton {
  label: string
  primary?: boolean
  secondary?: boolean
  transparent?: boolean
  icon?: IconDefinition
  clickFunc: Function
}

function Button({
  label, clickFunc, primary = true, secondary, transparent, icon,
}: IButton) {
  const classButton = classNames({
    [s.primary]: primary,
    [s.secondary]: secondary,
    [s.transparent]: transparent,
    [s.buttonWithIcon]: icon,
    [s.button]: true,
  });

  return (
    <button
      type='button'
      className={classButton}
      onClick={() => clickFunc()}
    >
      <span className={s.label}>
        {' '}
        {label}
      </span>
      {icon && <FontAwesomeIcon icon={icon} className={s.buttonIcon} />}
    </button>
  );
}

export default Button;
