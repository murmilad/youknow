import { all, takeLatest } from 'redux-saga/effects';

import * as actions from './constants/action';
import {
  oauth,
  submitGet,
  checkConnection,
  getUser,
  submitForm,
  putTokenToHeader,
  logOut,
  replace,
  navigate,
} from './saga/functions';

import googleAuthorize from '../api/google';
import githubAuthorize from '../api/github';

export function* callServerLastest() {
  // Set user data
  yield takeLatest(
    actions.SET_USER_DATA,
    submitForm,
    '/api/users/data',
    (request) => request.payload,
    (action, response) => []
  );

  // User check

  yield takeLatest(
    actions.CHECK_CONNECTION,
    checkConnection,
    (action) => '/api/healthchecker',
    () => []
  );

  yield takeLatest(
    actions.CONNECT_AND_SET_PARAMS,
    checkConnection,
    (action) => '/api/healthchecker',
    (action, response) => [
      {
        type: actions.SET_CONNECTION_PARAMS,
        payload: { server: action.payload.server, port: action.payload.port },
      },
      { type: actions.GET_USER },
    ]
  );

  // User get

  yield takeLatest(
    actions.GET_USER,
    getUser,
    (action) => '/api/users/me',
    (action, response) => [{ type: actions.SET_USER, payload: { user: response.data.data.user } }]
  );

  // User login

  yield takeLatest(
    actions.LOG_IN,
    submitForm,
    '/api/auth/login',
    (request) => request.payload.login,
    (action, response) => [
      { type: actions.PUT_TOKEN_HEADER, payload: { token: response.data.token } },
      { type: actions.GET_USER },
      { type: actions.SET_MAY_FORGET_PASSWORD, payload: { may_forget: false } },
    ]
  );
  yield takeLatest(actions.PUT_TOKEN_HEADER, putTokenToHeader, (action, response) => [
    { type: actions.SET_TOKEN, payload: { token: action.payload.token } },
  ]);

  // User logout

  yield takeLatest(actions.LOG_OUT, logOut);

  // User signUp/login OAuth

  yield takeLatest(actions.AUTH_GITHUB, oauth, githubAuthorize, () => []);

  yield takeLatest(actions.AUTH_GOOGLE, oauth, googleAuthorize, () => []);

  // User signUp E-Mail

  yield takeLatest(
    actions.VERIFY,
    submitGet,
    (action) => `/api/auth/verifyemail/${action.payload.verifyHash}`,
    (action, response) => [{ type: actions.SET_VERIFIED }]
  );
  yield takeLatest(actions.SET_VERIFIED, replace, 'VerifiedScreen');

  yield takeLatest(
    actions.SIGN_UP,
    submitForm,
    '/api/auth/register',
    (request) => request.payload.signup,
    (action, response) => [{ type: actions.SET_SIGN_UP }]
  );
  yield takeLatest(actions.SET_SIGN_UP, replace, 'SignedUpScreen');
  yield takeLatest(actions.CLEAN_LOGIN_STATUS, navigate, 'LoginScreen');

  // User Forgot password E-Mail

  yield takeLatest(
    actions.FORGOT_PASSWORD,
    submitForm,
    '/api/auth/forgotpassword',
    (request) => request.payload.forgot,
    (action, response) => [
      { type: actions.SET_FORGOT_PASSWORD },
      { type: actions.SET_MAY_FORGET_PASSWORD, payload: { may_forget: false } },
    ]
  );
  yield takeLatest(actions.SET_FORGOT_PASSWORD, navigate, 'ForgottenScreen');
  yield takeLatest(
    actions.RESET_PASSWORD,
    submitForm,
    '/api/auth/resetpassword',
    (request) => request.payload.reset,
    (action, response) => [{ type: actions.SET_RESET }]
  );
  yield takeLatest(actions.SET_RESET, navigate, 'ResettedScreen');

  // User OAuth login
  yield takeLatest(
    actions.OAUTH,
    submitGet,
    (action) =>
      `/api/sessions/oauth/${action.payload.params.oauthType}?initiator=mobile&${Object.keys(
        action.payload.params
      )
        .map((key) => `${key}=${encodeURIComponent(action.payload.params[key])}`)
        .join('&')}`,
    (action, response) => [
      { type: actions.PUT_TOKEN_HEADER, payload: { token: response.data.token } },
      { type: actions.GET_USER },
    ]
  );
}

export default function* rootSaga() {
  yield console.log('Hello Sagas!');
  yield all([callServerLastest()]);
}
