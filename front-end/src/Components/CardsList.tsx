import React from 'react';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizza.png';
import Card from './Card';
import s from './CardsList.module.scss';
import { routesStatic } from '../types';

function CardsList() {
  const cards = [{
    id: 0, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }, {
    id: 1, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }, {
    id: 2, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }, {
    id: 3, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }, {
    id: 4, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }, {
    id: 5, img: pizza, title: 'first pizza', description: 'very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm very tasty pizza mmmm ', price: 3.99,
  }];
  return (
    <div className={s.cardsList}>
      {cards.map((el) => (
        <Link
          key={el.id}
          to={`${routesStatic.goods}/${el.id}`}
        >
          <Card
            img={el.img}
            title={el.title}
            description={el.description}
            price={el.price}
          />
        </Link>
      ))}
    </div>
  );
}

export default CardsList;
