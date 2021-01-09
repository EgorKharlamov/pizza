import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';
import { IUserState } from './user/types';
import { initialStateUser } from './user/initialState';
import { IModalState } from './modals/types';
import { initialStateModal } from './modals/initialState';
import { IGoodsState } from './goods/types';
import { initialStateGoods } from './goods/initialState';
import { IOrderState } from './orders/types';
import { initialStateOrder } from './orders/initialState';
import { IToastState } from './toast/types';
import { initialStateToast } from './toast/initialState';

export interface IState {
  user: IUserState
  modal: IModalState
  good: IGoodsState
  order: IOrderState
  toast: IToastState
}

export const initialState = {
  user: { ...initialStateUser },
  modal: { ...initialStateModal },
  good: { ...initialStateGoods },
  order: { ...initialStateOrder },
  toast: { ...initialStateToast },
};

const bindMiddleware = (middleware:any) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    // eslint-disable-next-line global-require
    const { logger } = require('redux-logger');
    return composeWithDevTools(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  bindMiddleware([sagaMiddleware]),
);

sagaMiddleware.run(rootSaga);

export default store;
