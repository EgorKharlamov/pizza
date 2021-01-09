import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderActions } from '../Store/orders/actions';
import { IState } from '../Store';
import { IOrderState } from '../Store/orders/types';
import s from './OrdersHistory.module.scss';
import { IPizzaDto } from '../Api/Dto/Objects/IOrderDto';
import { formatDates } from '../Helpers/Dates';
import AuthProtect from '../Components/HOC/AuthProtect';

function OrdersHistory() {
  const dispatch = useDispatch();
  const { list } = useSelector<IState, IOrderState>((state) => state.order);
  useEffect(() => {
    dispatch(OrderActions.getOrdersHistory());
  }, []);
  return (
    <AuthProtect>
      <div className='wrapper'>
        <div className='page'>
          {list.map((el) => (
            <div className={s.history} key={el.id}>
              <h3>
                #
                {el.id}
              </h3>
              <p>{el.pizzas.map((pizza: IPizzaDto) => `${pizza.name} x${pizza.counts}`).join(', ')}</p>
              <p>{el.sum}</p>
              <p>
                {el.address.street}
                ,
                {' '}
                {el.address.building}
                ,
                {' '}
                {el.address.room}
              </p>
              <p>{formatDates.yyyymmddhhmm(el.dateOrder)}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthProtect>
  );
}

export default OrdersHistory;
