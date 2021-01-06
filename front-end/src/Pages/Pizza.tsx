import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoodActions } from '../Store/goods/actions';
import pizza from '../assets/img/pizza.png';
import s from './Pizza.module.scss';
import Button from '../Components/UI/Button';
import { addToCart } from '../Helpers/LocalStorage';
import { IState } from '../Store';
import { IGoodsState } from '../Store/goods/types';

function Pizza() {
  const params: {id: string} = useParams();

  const dispatch = useDispatch();
  const good = useSelector<IState, IGoodsState>((state) => state.good);
  const chosen = {
    id: 0,
    name: 'Pizza',
    description: 'asdf asd fasd fasd fasd fas df asd fasd fa sdf asdf asd fas dfasdf',
    inStock: true,
    orderTimes: 100,
    price: 3.99,
    timeToOrder: 1,
  };

  useEffect(() => {
    dispatch(GoodActions.getGoodById({ id: +params.id }));
  }, []);

  const addToCartClickHandler = () => {
    addToCart(good.chosen);
  };

  return (
    <div className='wrapper'>
      <div className={s.container}>
        <section className={`${s.section} ${s.sectionLeft}`}>
          <img src={pizza} alt='pizza' className={s.pic} />
        </section>
        <section className={`${s.section} ${s.sectionRight}`}>
          <h1 className={s.title}>{chosen?.name}</h1>
          <p className={s.description}>{chosen?.description}</p>
          <span className={`${s.inStock} ${s.span}`}>{chosen?.inStock}</span>
          <span className={`${s.orderTimes} ${s.span}`}>{chosen?.orderTimes}</span>
          <span className={`${s.price} ${s.span}`}>{chosen?.price}</span>
          <span className={`${s.timeToOrder} ${s.span}`}>{chosen?.timeToOrder}</span>
        </section>
        <footer className={s.footer}>
          <Button label='Add to cart' clickFunc={addToCartClickHandler} />
        </footer>
      </div>
    </div>
  );
}

export default Pizza;
