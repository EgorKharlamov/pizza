import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import pizza from '../assets/img/pizza.png';
import Card from './Card';
import s from './CardsList.module.scss';
import { routesStatic } from '../types';
import { GoodActions } from '../Store/goods/actions';
import { IGoodsState } from '../Store/goods/types';
import { IState } from '../Store';

function CardsList() {
  const dispatch = useDispatch();
  const { list } = useSelector<IState, IGoodsState>((state) => state.good);

  useEffect(() => {
    dispatch(GoodActions.getGoodsList());
  }, []);

  return (
    <div className={s.cardsList}>
      {list.length ? list.map((el) => (
        <Link
          key={el.id}
          to={`${routesStatic.goods}/${el.id}`}
        >
          <Card
            img={pizza}
            title={el.name}
            description={el.description}
            price={el.price}
          />
        </Link>
      )) : (<>load...</>)}
    </div>
  );
}

export default CardsList;
