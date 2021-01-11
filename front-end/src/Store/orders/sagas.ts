import {
  call, delay, put, takeEvery,
} from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import { v4 as uuidv4 } from 'uuid';
import { OrderActions } from './actions';
import requester from '../../Api';
import { ApiOrderEndpoint } from '../../Api/order';
import { IOrderDto } from '../../Api/Dto/Objects/IOrderDto';
import GetOrdersListDto from '../../Api/Dto/Requests/GetOrdersListDto';
import { ToastActions } from '../toast/actions';
import { ToastType } from '../toast/types';
import { ModalActions } from '../modals/actions';
import IGoods from '../goods/types';

function* sendOrderOrderWorker(action: Action<IOrderDto>) {
  try {
    yield call(requester, ApiOrderEndpoint.createOrder, { ...action.payload });

    const res = yield call(requester, ApiOrderEndpoint.getOrdersList, { page: 1, limit: 1 });
    yield put(OrderActions.setOrdersHistory(res));

    const uniqId = uuidv4();
    yield put(ToastActions.addToast({ id: uniqId, type: ToastType.success, message: 'Successfully send order!' }));
    yield put(ModalActions.modalToggle(null));

    yield delay(5000);
    yield put(ToastActions.rmByIdToast(uniqId));
  } catch (e) {
    const uniqId = uuidv4();
    yield put(ToastActions.addToast({ id: uniqId, type: ToastType.error, message: 'Something wrong...' }));
    yield delay(5000);
    yield put(ToastActions.rmByIdToast(uniqId));
  }
}

function* getOrdersHistoryOrderWorker(action: Action<GetOrdersListDto>) {
  try {
    const res = yield call(requester, ApiOrderEndpoint.getOrdersList, { ...action.payload });
    if (res) {
      yield put(OrderActions.setOrdersHistory(res));
    }
  } catch (e) { console.log(e); }
}

function* addGoodToCartOrderWorker(action: Action<IGoods>) {
  try {
    const uniqId = uuidv4();
    yield put(ToastActions.addToast({ id: uniqId, type: ToastType.success, message: `Pizza "${action.payload.name}" successfully added to cart!` }));
    yield delay(3000);
    yield put(ToastActions.rmByIdToast(uniqId));
  } catch (e) { console.log(e); }
}

export default function* watchUser() {
  yield takeEvery(OrderActions.Type.SEND_ORDER, sendOrderOrderWorker);
  yield takeEvery(OrderActions.Type.GET_ORDERS_HISTORY, getOrdersHistoryOrderWorker);
  yield takeEvery(OrderActions.Type.ADD_GOOD_TO_CART, addGoodToCartOrderWorker);
}
