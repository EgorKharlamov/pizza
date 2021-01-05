import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './SpecialOffers.module.scss';
import { routesStatic } from '../types';

export interface ISpecialOffer {
  title: string
  description: string
  img: string
}

function SpecialOffers({ title, description, img }: ISpecialOffer) {
  const history = useHistory();
  const moveToGoodsPage = () => {
    history.push(routesStatic.goods);
  };

  return (
    <>
      <h1 className={s.title}>Special offers!</h1>
      <section className={`${s.special}`} style={{ cursor: 'pointer' }} onClick={moveToGoodsPage}>
        <img src={img} alt='pizza' className={`${s.pic}`} />

        <section className={s.right}>
          <h2 className={s.specialTitle}>{title}</h2>
          <p className={s.specialText}>{description}</p>

        </section>
      </section>
    </>
  );
}

export default SpecialOffers;
