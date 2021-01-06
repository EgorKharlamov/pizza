import { call, put, takeEvery } from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import Cookies from 'universal-cookie';
import { UserActions } from './actions';
import ISignUpDto from '../../Api/Dto/Requests/SignUpDto';
import ISignInDto from '../../Api/Dto/Requests/SignInDto';
import requester from '../../Api';
import { ApiPartnerEndpoint } from '../../Api/partner';

function* signUpUserWorker(action: Action<ISignUpDto>) {
  try {
    const res = yield call(requester, ApiPartnerEndpoint.signUp, { ...action.payload });
    console.log(res);
  } catch (e) { console.log(e); }
}

function* signInUserWorker(action: Action<ISignInDto>) {
  try {
    const { access_token } = yield call(requester, ApiPartnerEndpoint.signIn,
      { ...action.payload });
    let user;
    if (access_token) {
      const cookies = new Cookies();
      cookies.set('auth', access_token, { path: '/' });
      user = yield call(requester, ApiPartnerEndpoint.profile);
    }
    if (user?.id) {
      yield put(UserActions.setUser({ ...user }));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getUserUserWorker() {
  try {
    const user = yield call(requester, ApiPartnerEndpoint.profile);
    if (user?.id) {
      yield put(UserActions.setUser({ ...user }));
    }
  } catch (e) { console.log(e); }
}

export default function* watchUser() {
  yield takeEvery(UserActions.Type.SIGN_UP, signUpUserWorker);
  yield takeEvery(UserActions.Type.SIGN_IN, signInUserWorker);
  yield takeEvery(UserActions.Type.GET_USER, getUserUserWorker);
}
