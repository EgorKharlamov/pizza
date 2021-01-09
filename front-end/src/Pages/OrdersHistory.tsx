import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderActions } from '../Store/orders/actions';
import { IState } from '../Store';
import { IOrderState } from '../Store/orders/types';
import s from './OrdersHistory.module.scss';
import { IPizzaDto } from '../Api/Dto/Objects/IOrderDto';
import { formatDates } from '../Helpers/Dates';
import AuthProtect from '../Components/HOC/AuthProtect';
import { IUserState } from '../Store/user/types';
import { Mathem } from '../Helpers/Mathem';

function OrdersHistory() {
  const dispatch = useDispatch();
  const { list } = useSelector<IState, IOrderState>((state) => state.order);
  const { currency: { current, coefficient } } = useSelector<IState, IUserState>((state) => state.user);
  useEffect(() => {
    dispatch(OrderActions.getOrdersHistory());
  }, []);
  return (
    <AuthProtect>
      <div className='wrapper'>
        <div className={`page ${s.container}`}>
          {list.map((el) => (
            <div className={s.history} key={el.id}>
              <h3 className={s.historyId}>
                #
                {el.id}
              </h3>
              <p className={s.historyGoods}>{el.pizzas.map((pizza: IPizzaDto) => `${pizza.name} x${pizza.counts}`).join(', ')}</p>
              <p className={s.historyPrice}>{`${Mathem.roundTwo(el.sum * coefficient)}${current}`}</p>
              <p className={s.historyAddress}>
                {el.address.street}
                ,
                {' '}
                {el.address.building}
                ,
                {' '}
                {el.address.room}
              </p>
              <p className={s.historyDate}>{formatDates.yyyymmddhhmm(el.dateOrder)}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthProtect>
  );
}

export default OrdersHistory;
