import { call, takeEvery } from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import Cookies from 'universal-cookie';
import { UserActions } from './actions';
import ISignUpDto from '../../Api/Dto/Requests/SignUpDto';
import ISignInDto from '../../Api/Dto/Requests/SignInDto';
import requester from '../../Api';
import { ApiPartnerEndpoint } from '../../Api/partner';

function* signUpUserWorker(action: Action<ISignUpDto>) {
  try {
    yield console.log('pow');
  } catch (e) { console.log(e); }
}

function* signInUserWorker(action: Action<ISignInDto>) {
  try {
    const { access_token } = yield call(requester, ApiPartnerEndpoint.signIn,
      { ...action.payload });
    if (access_token) {
      const cookies = new Cookies();
      cookies.set('auth', access_token, { path: '/' });
    }
  } catch (e) {
    console.log(e);
  }
}

function* logOutUserWorker(action: Action<any>) {
  try {
    yield console.log('pow');
  } catch (e) { console.log(e); }
}

export default function* watchUser() {
  yield takeEvery(UserActions.Type.SIGN_UP, signUpUserWorker);
  yield takeEvery(UserActions.Type.SIGN_IN, signInUserWorker);
  yield takeEvery(UserActions.Type.LOG_OUT, logOutUserWorker);
}
