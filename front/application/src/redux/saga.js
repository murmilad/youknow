import { all, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  oauth,
  submitGet,
  checkConnection,
  getUser,
  submitForm,
  putTokenToHeader,
  logOut,
} from './saga/functions';

import googleAuthorize from '../api/google';
import githubAuthorize from '../api/github';

export function* callServerLastest() {
  yield takeLatest(actions.AUTH_GITHUB, oauth(githubAuthorize), (action, response) => [
    { action: actions.PUT_TOKEN_HEADER, payload: { token: response.accessToken } },
  ]);

  yield takeLatest(actions.AUTH_GOOGLE, oauth(googleAuthorize), (action, response) => [
    { action: actions.PUT_TOKEN_HEADER, payload: { token: response.accessToken } },
  ]);

  yield takeLatest(
    actions.VERIFY,
    submitGet,
    (action) => `/api/auth/verifyemail/${action.payload.verifyHash}`,
    (action, response) => [{ action: actions.SET_VERIFIED, payload: { verified: true } }]
  );
  yield takeLatest(
    actions.CHECK_CONNECTION,
    checkConnection,
    (action) => '/api/healthchecker',
    (action, response) => [{ action: actions.GET_USER }]
  );
  yield takeLatest(
    actions.CONNECT_AND_SET_PARAMS,
    checkConnection,
    (action) => '/api/healthchecker',
    (action, response) => [
      {
        action: actions.SET_CONNECTION_PARAMS,
        payload: { server: action.payload.server, port: action.payload.port },
      },
      { action: actions.GET_USER },
    ]
  );
  yield takeLatest(
    actions.GET_USER,
    getUser,
    (action) => '/api/users/me',
    (action, response) => [{ action: actions.SET_USER, payload: { user: response.data.data.user } }]
  );
  yield takeLatest(
    actions.SIGN_UP,
    submitForm,
    '/api/auth/register',
    (request) => request.payload.signup,
    (action, response) => [{ action: actions.SET_SIGN_UP, payload: { signed_up: true } }]
  );
  yield takeLatest(
    actions.FORGOT_PASSWORD,
    submitForm,
    '/api/auth/forgotpasswordapp',
    (request) => request.payload.forgot,
    (action, response) => [
      { action: actions.SET_FORGOT_PASSWORD, payload: { forgot_password: true } },
    ]
  );
  yield takeLatest(
    actions.RESET_PASSWORD,
    submitForm,
    '/api/auth/resetpasswordapp',
    (request) => request.payload.reset,
    (action, response) => [{ action: actions.SET_RESET, payload: { reseted: true } }]
  );
  yield takeLatest(
    actions.LOG_IN,
    submitForm,
    '/api/auth/login',
    (request) => request.payload.login,
    (action, response) => [
      { action: actions.PUT_TOKEN_HEADER, payload: { token: response.data.token } },
    ]
  );
  yield takeLatest(actions.PUT_TOKEN_HEADER, putTokenToHeader, (action, response) => [
    { action: actions.SET_TOKEN, payload: { token: action.payload.token } },
  ]);
  yield takeLatest(actions.LOG_OUT, logOut);
}

export default function* rootSaga() {
  yield console.log('Hello Sagas!');
  yield all([callServerLastest()]);
}
