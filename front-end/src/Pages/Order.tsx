import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Components/UI/Button';
import { ModalActions } from '../Store/modals/actions';
import { ModalsType } from '../types';
import s from './Order.module.scss';
import { IOrderState } from '../Store/orders/types';
import { IState } from '../Store';
import { Cart } from '../Helpers/LocalStorage/Cart';
import { IUserState } from '../Store/user/types';
import { GoodActions } from '../Store/goods/actions';
import { IGoodsState } from '../Store/goods/types';
import { OrderActions } from '../Store/orders/actions';
import { Mathem } from '../Helpers/Mathem';

const CartCardsList = React.lazy(() => import('../Components/CartCardsList'));

function Order() {
  const dispatch = useDispatch();
  const { cart } = useSelector<IState, IOrderState>((state) => state.order);
  const goods = useSelector<IState, IGoodsState>((state) => state.good);
  const user = useSelector<IState, IUserState>((state) => state.user);
  const openFormOrderModal = () => {
    dispatch(ModalActions.modalToggle(ModalsType.formOrderModal));
  };
  const [isOpenPrice, toggleIsOpenPrice] = useState(false);
  const { totalPrice } = Cart.modifyCart(cart);
  const DELIVERY_COST = 5;

  useEffect(() => {
    if (!goods.list.length) {
      dispatch(GoodActions.getGoodsList());
    }
  }, []);
  useEffect(() => {
    if (user.id !== -1) {
      dispatch(OrderActions.getOrdersHistory());
    }
  }, [user]);
  return (
    <div className='wrapper'>
      <div className='page'>

        <Suspense fallback={<>Loading...</>}>
          <CartCardsList />
        </Suspense>

        {cart.length ? (
          <>
            <div className={s.price}>
              <div
                className={s.priceContainer}
                onClick={() => toggleIsOpenPrice(!isOpenPrice)}
              >
                <h2 className={s.priceTitle}>
                  <p className={s.priceTitleText}>Total price:</p>
                  <p className={s.priceTitleVal}>
                    {`${Mathem.roundTwo((totalPrice + DELIVERY_COST) * user.currency.coefficient)}${user.currency.current}`}
                  </p>
                </h2>
                {isOpenPrice && (
                  <>
                    <p className={s.priceSub}>
                      <span className={s.priceSubText}>Pizzas:</span>
                      <span className={s.priceSubVal}>{`${Mathem.roundTwo(totalPrice * user.currency.coefficient)}${user.currency.current}`}</span>
                    </p>
                    <p className={s.priceSub}>
                      <span className={s.priceSubText}>Delivery:</span>
                      <span className={s.priceSubVal}>{`${Mathem.roundTwo(DELIVERY_COST * user.currency.coefficient)}${user.currency.current}`}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className={s.buttonContainer}>
              <Button
                label='Form order'
                clickFunc={openFormOrderModal}
              />
            </div>
          </>
        ) : <h1>Cart is empty</h1>}
      </div>
    </div>
  );
}

export default Order;
