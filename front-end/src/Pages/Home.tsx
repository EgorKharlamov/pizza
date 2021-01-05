import React from 'react';
import { useSelector } from 'react-redux';
import pizzaPic from '../assets/img/pizza.png';
import SpecialOffers from '../Components/SpecialOffers';
import { IState } from '../Store';

function Home() {
  const specialOffer = [{
    id: 0, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }];
  const kek = useSelector<IState, string|undefined>((state) => state.user.name);
  console.log('HOME page, name: ', kek);

  return (
    <div className='wrapper'>
      <div className='page'>
        {specialOffer.map((el) => (
          <SpecialOffers
            title={el.title}
            description={el.description}
            img={el.img}
            key={el.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
