import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';
import { IUser } from './user/types';
import { initialStateUser } from './user/initialState';

export interface IState {
  user: IUser
}

export const initialState = {
  user: { ...initialStateUser },
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
