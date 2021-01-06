import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { ThemeType } from '../types';
import s from './SwapTheme.module.scss';

function SwapTheme() {
  const cookie = new Cookies();
  const cookieTheme = cookie.get('theme');

  const [theme, setTheme] = useState(cookieTheme || ThemeType.light);
  const [open, setOpen] = useState(false);

  const setRootTheme = () => {
    theme !== ThemeType.dark ? setTheme(ThemeType.dark) : setTheme(ThemeType.light);
    document.getElementsByTagName('html')[0].setAttribute('data-theme',
      theme);
    cookie.set('theme', theme);
  };

  useEffect(() => {
    setRootTheme();
  }, []);

  const themeClass = classNames({
    [s.animate]: !open,
    [s.open]: open,
    [s.theme]: true,
  });

  const node = useRef<HTMLDivElement>(null!);

  const handleClickOut = (e: any) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOut);
    } else {
      document.removeEventListener('mousedown', handleClickOut);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, [open]);

  return (
    <div className={themeClass} onClick={() => setOpen(true)} ref={node}>
      <FontAwesomeIcon icon={faSun} className={`${s.icon}`} onClick={setRootTheme} />
    </div>
  );
}

export default SwapTheme;
