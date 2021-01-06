import React from 'react';
import pizzaPic from '../assets/img/pizza.png';
import SpecialOffers from '../Components/SpecialOffers';

function Home() {
  const specialOffer = [{
    id: 0, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  },
  {
    id: 1, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 2, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 3, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 4, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 6, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 5, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 7, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  }, {
    id: 8, title: 'Get my PIZZZZA!', description: 'long text about offer long text about offer long text about offer long text about offer long text about offer ', img: pizzaPic,
  },
  ];

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
