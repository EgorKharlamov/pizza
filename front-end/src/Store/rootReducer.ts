import { combineReducers } from 'redux';
import { user } from './user/reducers';
import { modal } from './modals/reducers';
import { good } from './goods/reducers';

export const rootReducer = combineReducers({
  user,
  modal,
  good,
});
