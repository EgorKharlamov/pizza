import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { ThemeType } from '../types';
import s from './SwapTheme.module.scss';
import { Theme } from '../Helpers/LocalStorage/Theme';

function SwapTheme() {
  const storedTheme = Theme.getTheme();

  const [themeState, setThemeState] = useState(storedTheme || ThemeType.light);
  const [open, setOpen] = useState(false);

  const setRootTheme = () => {
    themeState !== ThemeType.dark ? setThemeState(ThemeType.dark) : setThemeState(ThemeType.light);
    document.getElementsByTagName('html')[0].setAttribute('data-theme',
      themeState);
    Theme.setTheme(themeState);
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
