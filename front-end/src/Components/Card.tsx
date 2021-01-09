import React from 'react';
import s from './Card.module.scss';

export interface ICard {
  img: string
  title: string
  description: string
  price: string
}

function Card({
  img, title, description, price,
}: ICard) {
  return (
    <div className={s.card}>
      <img src={img} alt='pizza' className={s.img} />
      <div className={s.priceContainer}>
        <span className={s.price}>{price}</span>
      </div>
      <div className={s.content}>
        <section className={s.body}>
          <h3 className={s.title}>{title}</h3>
          <p className={s.description}>{description}</p>
        </section>
      </div>
    </div>
  );
}

export default Card;
