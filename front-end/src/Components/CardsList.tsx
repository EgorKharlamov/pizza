import React, { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import pizza from '../assets/img/pizza.webp';
import s from './CardsList.module.scss';
import { routesStatic } from '../types';
import { GoodActions } from '../Store/goods/actions';
import IGoods, { IGoodsState } from '../Store/goods/types';
import { IState } from '../Store';
import Button from './UI/Button';
import { OrderActions } from '../Store/orders/actions';
import { IOrderState } from '../Store/orders/types';
import { Cart } from '../Helpers/LocalStorage/Cart';
import { IModifiedCart } from './CartCardsList';
import { IUserState } from '../Store/user/types';
import { Mathem } from '../Helpers/Mathem';

const Card = React.lazy(() => import('./Card'));

function CardsList() {
  const dispatch = useDispatch();
  const { list } = useSelector<IState, IGoodsState>((state) => state.good);
  const user = useSelector<IState, IUserState>((state) => state.user);
  const { cart } = useSelector<IState, IOrderState>((state) => state.order);
  const modifiedCart: IModifiedCart = Cart.modifyCart(cart);
  const getCount = (id: number) => {
    const res = modifiedCart.list.filter((el) => el.id === id);
    if (res[0]) {
      return res[0].count;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(GoodActions.getGoodsList());
  }, []);

  const addToCard = (good: IGoods) => {
    dispatch(OrderActions.addGoodToCart(good));
  };
  const rmFromCard = (id: number) => {
    dispatch(OrderActions.rmGoodFromCart(id));
  };

  return (
    <div className={s.cardsList}>
      {list.map((el) => (
        <div key={el.id}>
          <Suspense fallback={<>Loading...</>}>
            <Link
              to={`${routesStatic.goods}/${el.id}`}
            >
              <Card
                img={pizza}
                title={el.name}
                description={el.description}
                price={`${Mathem.roundTwo(el.price * user.currency.coefficient)}${user.currency.current}`}
              />
            </Link>
          </Suspense>
          <div className={s.buttons}>
            <Button label='-' clickFunc={() => rmFromCard(el.id)} secondary disabled={getCount(el.id) === 0} />
            <span className={s.count}>{getCount(el.id)}</span>
            <Button label='+' clickFunc={() => addToCard(el)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsList;
