import { combineReducers } from 'redux';
import { user } from './user/reducers';
import { modal } from './modals/reducers';
import { good } from './goods/reducers';
import { order } from './orders/reducers';
import { toast } from './toast/reducers';

export const rootReducer = combineReducers({
  user,
  modal,
  good,
  order,
  toast,
});
