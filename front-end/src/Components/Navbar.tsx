import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons/faPizzaSlice';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Logo from './Logo';
import { routesStatic, ThemeType } from '../types';
import s from './Navbar.module.scss';
import Dropdown from './UI/Dropdown';

function Navbar() {
  const [swapTheme, setSwapTheme] = useState('');
  const logOut = () => {
    console.log('log out function!');
  };

  const getHtmlTheme = () => {
    const theme = document.getElementsByTagName('html')[0].getAttribute('data-theme');
    return theme !== ThemeType.dark ? ThemeType.light : ThemeType.dark;
  };

  const setRootTheme = () => {
    swapTheme !== ThemeType.dark ? setSwapTheme(ThemeType.dark) : setSwapTheme(ThemeType.light);
    document.getElementsByTagName('html')[0].setAttribute('data-theme',
      swapTheme !== ThemeType.light ? ThemeType.dark : ThemeType.light);
  };

  const location = useLocation();
  const dropdownOptions = [{ name: `Swap theme to ${getHtmlTheme() === ThemeType.light ? ThemeType.dark : ThemeType.light}`, functionToEmit: setRootTheme }, { name: 'Logout', functionToEmit: logOut }];

  useEffect(() => {
    const currentTheme = getHtmlTheme();
    if (!currentTheme || currentTheme === ThemeType.light) {
      setSwapTheme(ThemeType.dark);
    } else {
      setSwapTheme(ThemeType.light);
    }
  }, []);

  return (
    <div className={s.navbarContainer}>
      <div className='wrapper'>
        <div className={`${s.navbar}`}>
          <div className='logo'>
            <Link to={routesStatic.home} className={`${s.link}`}>
              <Logo />
            </Link>
          </div>

          <ul className={`${s.menu}`}>
            <li className={`${s.menuItem}`}>
              <Link
                to={routesStatic.goods}
                className={`${s.link} ${s.menuLink} ${location.pathname === routesStatic.goods && s.active}`}
              >
                <span className={`${s.text}`}>Goods</span>
                <FontAwesomeIcon icon={faPizzaSlice} className={`${s.icon}`} />
              </Link>
            </li>

            <li className={`${s.menuItem}`}>
              <Link
                to={routesStatic.order}
                className={`${s.link} ${s.menuLink} ${location.pathname === routesStatic.order && s.active}`}
              >
                <span className={`${s.text}`}>Order</span>
                <FontAwesomeIcon icon={faShoppingCart} className={`${s.icon}`} />
              </Link>
            </li>

            <Dropdown
              label='Account'
              icon={faUser}
              options={dropdownOptions}
              isAccount
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
