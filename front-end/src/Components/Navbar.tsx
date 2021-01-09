import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons/faPizzaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { faUserCheck, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { ModalsType, routesStatic } from '../types';
import s from './Navbar.module.scss';
import Dropdown from './UI/Dropdown';
import { IState } from '../Store';
import { IUserState } from '../Store/user/types';
import Button from './UI/Button';
import { ModalActions } from '../Store/modals/actions';
import { UserActions } from '../Store/user/actions';
import { IOrderState } from '../Store/orders/types';
import { OrderActions } from '../Store/orders/actions';
import { Cart } from '../Helpers/LocalStorage/Cart';

function Navbar() {
  const dispatch = useDispatch();
  const user: IUserState = useSelector<IState, IUserState>((state) => state.user);

  const openModalSignIn = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signInModal));
  };
  const openModalSignUp = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signUpModal));
  };
  const logOut = () => {
    dispatch(UserActions.logOut());
  };

  const location = useLocation();
  const dropdownOptions = [{ name: 'Logout', functionToEmit: logOut }];

  const { cart }: IOrderState = useSelector<IState, IOrderState>((state) => state.order);
  useEffect(() => {
    const list = Cart.getGoodsList();
    list && dispatch(OrderActions.setGoodsListToCart(list));
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
                className={`${s.link} ${s.menuLink} ${location.pathname.indexOf(routesStatic.goods) > -1 && s.active}`}
              >
                <span className={`${s.text}`}>Goods</span>
                <FontAwesomeIcon icon={faPizzaSlice} className={`${s.icon}`} />
              </Link>
            </li>

            <li className={`${s.menuItem}`}>
              <Link
                to={routesStatic.order}
                className={`${s.link} ${s.menuLink} ${location.pathname.indexOf(routesStatic.order) > -1 && s.active}`}
              >
                <span className={`${s.text}`}>Order</span>
                <FontAwesomeIcon icon={faShoppingCart} className={`${s.icon}`} />
                <span className={s.count}>{cart.length}</span>
              </Link>
            </li>

            {user.id! > -1 ? (
              <Dropdown
                label='Account'
                icon={faUserCircle}
                options={dropdownOptions}
                isAccount
              />
            ) : (
              <>
                <Button label='Sign in' clickFunc={openModalSignIn} transparent icon={faUserCheck} />
                <Button label='Sign up' clickFunc={openModalSignUp} transparent icon={faUserPlus} />
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
