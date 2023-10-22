/* eslint-disable no-restricted-syntax */
import { call, put } from 'redux-saga/effects';
import SERVER, { setCredentails, dropCredentails, setBaseUrl } from '../../api/server';

import * as actions from '../constants/action';

export function getErrorMessage(error) {
  const errorMessage = error.response?.data.message || error.response?.data || error.message;
  if (
    errorMessage === 'invalidate token: Token is expired' ||
    errorMessage === 'You are not logged in'
  ) {
    return [errorMessage, { type: actions.LOG_OUT }];
  }
  if (errorMessage === 'Invalid email or Password') {
    return [errorMessage, { type: actions.SET_MAY_FORGET_PASSWORD, payload: { may_forget: true } }];
  }
  return [errorMessage];
}

export function* putTokenToHeader(successActions, action) {
  setCredentails(action.payload.token);
  for (const successAction of successActions(action)) {
    yield put(successAction);
  }
}

export function* logOut(action) {
  yield put({ type: actions.REMOVE_TOKEN });
  yield put({ type: actions.SET_USER, payload: { user: null } });
  dropCredentails();
}

export function* deleteResource(linkCallback, successActions, action) {
  try {
    const result = yield call(SERVER.delete, linkCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

export function* getUser(linkCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = yield call(SERVER.get, linkCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } });
}

export function* checkConnection(linkCallback, successActions, action) {
  try {
    setBaseUrl(action.payload.server, action.payload.port);
    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = yield call((link) => SERVER.get(link), linkCallback(action));
    yield put({ type: actions.SET_CONNECTED });
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
    yield put({ type: actions.SET_DISCONNECTED });
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } });
}

export function* oauth(handler, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = handler();
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } });
}

export function* submitGet(linkCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = yield call(SERVER.get, linkCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } });
}

export function* submitForm(link, requestCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = yield call(SERVER.post, link, requestCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } });
}

export function* uploadResource(linkCallback, requestCallback, successActions, action) {
  const formData = new FormData();
  yield fetch(requestCallback(action))
    .then((res) => res.blob())
    .then((blob) => {
      formData.append('file', blob);
    });
  try {
    const result = yield call(SERVER.post, linkCallback(action), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

export function* postResource(link, requestCallback, successActions, action) {
  try {
    const result = yield call(SERVER.post, link, requestCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

export function* fetchResource(linkCallback, resultCallback, successActions, action) {
  try {
    const result = yield call(SERVER.get, linkCallback(action));
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}
