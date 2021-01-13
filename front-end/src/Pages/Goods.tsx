import React, { Suspense } from 'react';

const CardsList = React.lazy(() => import('../Components/CardsList'));

function Goods() {
  return (
    <div className='wrapper'>
      <Suspense fallback={<>Loading...</>}>
        <CardsList />
      </Suspense>
    </div>
  );
}

export default Goods;
