import React from 'react';
import { useSelector } from 'react-redux';
import s from './CartCardsList.module.scss';
import { IState } from '../Store';
import { IOrderState } from '../Store/orders/types';
import { Cart } from '../Helpers/LocalStorage/Cart';
import CartCard from './CartCard';

export interface IModifiedCart {
  list:
    {id: number, name: string,
      count: number,
      price: number,
      img: string
    }[],
  totalPrice: number
}

function CartCardsList() {
  const { cart } = useSelector<IState, IOrderState>((state) => state.order);
  const modifiedCart: IModifiedCart = Cart.modifyCart(cart);

  return (
    <div className={s.container}>
      {modifiedCart.list.map((el) => (
        <CartCard
          key={el.id}
          name={el.name}
          count={el.count}
          price={el.price}
          id={el.id}
          img={el.img}
        />
      ))}
    </div>
  );
}

export default CartCardsList;
