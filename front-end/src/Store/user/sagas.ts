import {
  call, delay, put, takeEvery,
} from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import { v4 as uuidv4 } from 'uuid';
import { UserActions } from './actions';
import ISignUpDto from '../../Api/Dto/Requests/SignUpDto';
import ISignInDto from '../../Api/Dto/Requests/SignInDto';
import requester from '../../Api';
import { ApiPartnerEndpoint } from '../../Api/partner';
import { Auth } from '../../Helpers/LocalStorage/Auth';
import { ToastActions } from '../toast/actions';
import { ToastType } from '../toast/types';
import { ModalActions } from '../modals/actions';

function* signUpUserWorker(action: Action<ISignUpDto>) {
  try {
    // @ts-ignore
    const res = yield call(requester, ApiPartnerEndpoint.signUp, { ...action.payload });
    if (res.id) {
      const uniqId = uuidv4();
      yield put(ModalActions.modalToggle(null));

      const { access_token } = yield call(requester, ApiPartnerEndpoint.signIn,
        { email: action.payload.email, pass: action.payload.pass });
      let user;
      if (access_token) {
        Auth.setAuth(access_token);
        // @ts-ignore
        user = yield call(requester, ApiPartnerEndpoint.profile);
      }
      if (user?.id) {
        yield put(UserActions.setUser({ ...user }));
      }

      yield put(ToastActions.addToast({ id: uniqId, type: ToastType.success, message: 'Successfully sign up! You are logged in now.' }));
      yield delay(5000);
      yield put(ToastActions.rmByIdToast(uniqId));
    }
  } catch (e) {
    const uniqId = uuidv4();
    yield put(ToastActions.addToast({ id: uniqId, type: ToastType.error, message: `Something wrong! ${e}` }));
    yield delay(5000);
    yield put(ToastActions.rmByIdToast(uniqId));
  }
}

function* signInUserWorker(action: Action<ISignInDto>) {
  try {
    const { access_token } = yield call(requester, ApiPartnerEndpoint.signIn,
      { ...action.payload });
    let user;
    if (access_token) {
      Auth.setAuth(access_token);
      // @ts-ignore
      user = yield call(requester, ApiPartnerEndpoint.profile);
    }
    if (user?.id) {
      yield put(UserActions.setUser({ ...user }));
      yield put(ModalActions.modalToggle(null));

      const uniqId = uuidv4();
      yield put(ToastActions.addToast({ id: uniqId, type: ToastType.success, message: 'Successfully sign in!' }));
      yield delay(5000);
      yield put(ToastActions.rmByIdToast(uniqId));
    }
  } catch (e) {
    const uniqId = uuidv4();
    yield put(ToastActions.addToast({ id: uniqId, type: ToastType.error, message: `Error sign in! ${e.message}` }));
    yield delay(5000);
    yield put(ToastActions.rmByIdToast(uniqId));
  }
}

function* getUserUserWorker() {
  try {
    // @ts-ignore
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
