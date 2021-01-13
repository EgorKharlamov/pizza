import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faClock, faCoins, faTimesCircle, faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { GoodActions } from '../Store/goods/actions';
import s from './Pizza.module.scss';
import pizza from '../assets/img/pizza.webp';
import Button from '../Components/UI/Button';
import { IState } from '../Store';
import IGoods, { IGoodsState } from '../Store/goods/types';
import { OrderActions } from '../Store/orders/actions';
import { IUserState } from '../Store/user/types';
import { Mathem } from '../Helpers/Mathem';
import { routesStatic } from '../types';

function Pizza() {
  const params: {id: string} = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const good = useSelector<IState, IGoodsState>((state) => state.good);
  const { currency: { current, coefficient } } = useSelector<IState, IUserState>((state) => state.user);
  const { chosen } = good;

  useEffect(() => {
    dispatch(GoodActions.getGoodById({ id: +params.id }));
  }, []);

  const addToCartClickHandler = () => {
    dispatch(OrderActions.addGoodToCart(good.chosen as IGoods));
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
          <div className={s.stats}>
            <span className={`${s.inStock} ${s.span}`}>
              {chosen?.inStock
                ? <FontAwesomeIcon icon={faCheck} className={s.icon} />
                : <FontAwesomeIcon icon={faTimesCircle} className={s.icon} />}
              <span className={`${s.text} ${s.description}`}>In stock</span>
              <span className={s.text}>{chosen?.inStock}</span>
            </span>
            <span className={`${s.orderTimes} ${s.span}`}>
              <FontAwesomeIcon icon={faTruck} className={s.icon} />
              <span className={`${s.text} ${s.description}`}>Order times</span>
              <span className={s.text}>{chosen?.orderTimes}</span>
            </span>
            <span className={`${s.price} ${s.span}`}>
              <FontAwesomeIcon icon={faCoins} className={s.icon} />
              <span className={`${s.text} ${s.description}`}>Price</span>
              <span className={s.text}>
                {
                !!chosen?.price && `${Mathem.roundTwo(chosen!.price * coefficient)}${current}`
              }
              </span>
            </span>
            <span className={`${s.timeToOrder} ${s.span}`}>
              <FontAwesomeIcon icon={faClock} className={s.icon} />
              <span className={`${s.text} ${s.description}`}>Time to order</span>
              <span className={s.text}>{chosen?.timeToOrder}</span>
            </span>

          </div>
        </section>
        <footer className={s.footer}>
          <Button label='Goods' clickFunc={() => history.push(routesStatic.goods)} secondary />
          <Button label='Add to cart' clickFunc={addToCartClickHandler} />
        </footer>
      </div>
    </div>
  );
}

export default Pizza;
