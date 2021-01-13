import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './SuccessOrder.module.scss';
import Button from '../UI/Button';
import { routesStatic } from '../../types';
import { ModalActions } from '../../Store/modals/actions';

function SuccessOrder() {
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = () => {
    dispatch(ModalActions.modalToggle(null));
    history.push(routesStatic.goods);
  };

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>
          <FontAwesomeIcon icon={faCheckCircle} className={s.titleIcon} />
          <span className={s.titleText}>Congratulations!</span>
        </h1>
        <div className={s.textContainer}>
          <p className={s.text}>We got your order and will start to preparing it soon.</p>
          <p className={s.text}>Please, wait for our call.</p>
        </div>

        <div className={s.btnContainer}>
          <Button label='Go to Goods page' clickFunc={clickHandler} />
        </div>
      </div>
    </>
  );
}

export default SuccessOrder;
