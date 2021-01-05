import React from 'react';
import logo from '../assets/img/pizza-logo.svg';
import s from './Logo.module.scss';

function Logo() {
  return (
    <div className={`${s.logo}`}>
      <span className={s.text}>Pizza</span>
      <img src={logo} alt='logo' className={s.pic} />
    </div>
  );
}

export default Logo;
