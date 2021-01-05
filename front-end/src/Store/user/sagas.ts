import {
  takeEvery,
} from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import axios from 'axios';
import { ISignIn } from '../../Api/Dto/SignIn';
import { ISignUp } from '../../Api/Dto/SignUp';
import { UserActions } from './actions';

function* signUpUserWorker(action: Action<ISignUp>) {
  try {
    yield console.log('pow');
  } catch (e) { console.log(e); }
}

function* signInUserWorker(action: Action<ISignIn>) {
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:2310/api/v1/user' : 'http://localhost/api/user';
  try {
    yield console.log('sign in');
    const req = axios.put(url, { ...action.payload });
    console.log('saga req', req);
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
