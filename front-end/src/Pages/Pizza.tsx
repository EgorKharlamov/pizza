import React from 'react';
import { useParams } from 'react-router-dom';

function Pizza() {
  const params: {id: string | undefined} = useParams();

  return (
    <div>
      pizza
      {params.id}
    </div>
  );
}

export default Pizza;
