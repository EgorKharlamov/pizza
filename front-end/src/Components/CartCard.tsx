import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSortDown, faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import s from './CartCard.module.scss';
import pizza from '../assets/img/pizza.webp';
import { OrderActions } from '../Store/orders/actions';
import { IState } from '../Store';
import IGoods, { IGoodsState } from '../Store/goods/types';

export interface CartCardProp {
  id: number
  name: string
  count: number
  price: string
}
function CartCard({
  name, count, price, id,
}: CartCardProp) {
  const dispatch = useDispatch();
  const { list } = useSelector<IState, IGoodsState>((state) => state.good);

  const removeCartItem = () => {
    dispatch(OrderActions.rmGoodFromCart(id));
  };

  const addCartItem = () => {
    const currentGood = list.filter((el:IGoods) => el.id === id)[0];
    dispatch(OrderActions.addGoodToCart(currentGood));
  };
  const removeAllByIdCartItem = () => {
    dispatch(OrderActions.rmAllIdGoodFromCart(id));
  };

  return (
    <div className={s.container}>
      <div className={s.picContainer}>
        <img src={pizza} alt='pizza' className={s.pic} />
      </div>
      <span className={s.span}>{name}</span>
      <span className={`${s.span} ${s.countContainer}`}>
        x
        {count}
        <div className={s.countAction}>
          <span onClick={addCartItem} className={s.countActionUp}>
            <FontAwesomeIcon icon={faSortUp} />
          </span>
          <span onClick={removeCartItem} className={s.countActionDown}>
            <FontAwesomeIcon icon={faSortDown} />
          </span>
        </div>
      </span>
      <span className={s.span}>{price}</span>
      <div className={s.iconContainer}>
        <FontAwesomeIcon icon={faTimes} className={s.icon} onClick={removeAllByIdCartItem} />
      </div>
    </div>
  );
}

export default CartCard;
