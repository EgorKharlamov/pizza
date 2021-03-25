import { call, put, takeEvery } from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import requester from '../../Api';
import { ApiPartnerEndpoint } from '../../Api/partner';
import IGetGoodByIdDto from '../../Api/Dto/Requests/GetGoodByIdDto';
import { GoodActions } from './actions';

function* getGoodsListWorker() {
  try {
    // @ts-ignore
    const goodsList = yield call(requester, ApiPartnerEndpoint.getGoods);
    if (goodsList.length) {
      yield put(GoodActions.setGoodsList(goodsList));
    }
  } catch (e) {
    console.log(e);
  }
}
function* getGoodByIdWorker(action: Action<IGetGoodByIdDto>) {
  try {
    // @ts-ignore
    const good = yield call(requester, ApiPartnerEndpoint.getGoodById,
      { ...action.payload });
    if (good.id) {
      yield put(GoodActions.setChosenGood(good));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGood() {
  yield takeEvery(GoodActions.Type.GET_GOODS_LIST, getGoodsListWorker);
  yield takeEvery(GoodActions.Type.GET_GOOD_BY_ID, getGoodByIdWorker);
}
