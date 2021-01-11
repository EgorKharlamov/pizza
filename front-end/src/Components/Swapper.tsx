import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign, faSun } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeType } from '../types';
import s from './Swapper.module.scss';
import { Theme } from '../Helpers/LocalStorage/Theme';
import { CurrencyType, IUserState } from '../Store/user/types';
import { UserActions } from '../Store/user/actions';
import { IState } from '../Store';

function Swapper() {
  const dispatch = useDispatch();
  const user: IUserState = useSelector<IState, IUserState>((state) => state.user);
  const storedTheme = Theme.getTheme();

  const [themeState, setThemeState] = useState(storedTheme || ThemeType.light);
  const [open, setOpen] = useState(true);
  const [swapCurrency, setSwapCurrency] = useState<CurrencyType>(CurrencyType.euro);

  const setRootTheme = () => {
    themeState !== ThemeType.dark ? setThemeState(ThemeType.dark) : setThemeState(ThemeType.light);
    document.getElementsByTagName('html')[0].setAttribute('data-theme',
      themeState);
    Theme.setTheme(themeState);
  };
  const swapCurrencyStore = () => {
    swapCurrency === CurrencyType.dollar
      ? dispatch(UserActions.currencySwapToDollar())
      : dispatch(UserActions.currencySwapToEuro());
  };

  const swapperClass = classNames({
    [s.animate]: !open,
    [s.open]: open,
    [s.swapper]: true,
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
  useEffect(() => {
    setRootTheme();
  }, []);
  useEffect(() => {
    setSwapCurrency(user.currency.current === CurrencyType.dollar ? CurrencyType.euro : CurrencyType.dollar);
  }, [user.currency]);

  return (
    <div className={swapperClass} onClick={() => setOpen(true)} ref={node}>
      {swapCurrency === CurrencyType.dollar && <FontAwesomeIcon icon={faDollarSign} className={s.icon} onClick={swapCurrencyStore} />}
      {swapCurrency === CurrencyType.euro && <FontAwesomeIcon icon={faEuroSign} className={s.icon} onClick={swapCurrencyStore} />}
      <FontAwesomeIcon icon={faSun} className={`${s.icon}`} onClick={setRootTheme} />
    </div>
  );
}

export default Swapper;
