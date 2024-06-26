/* eslint-disable no-restricted-syntax */
import { call, put } from 'redux-saga/effects';

import SERVER, { setCredentails, dropCredentails, setBaseUrl } from '../../api/server';

import * as actions from '../constants/action';
import * as NavigationService from '../../navigation/service/NavigationService';

export function* navigate(routeName, params, action) {
  yield call(NavigationService.navigate, routeName, params);
}
export function* replace(routeName, params, action) {
  yield call(NavigationService.replace, routeName, params);
}
export function getErrorMessage(error) {
  console.log(`[ERROR] ${JSON.stringify(error)}`);
  const errorMessage = error.response?.data.message || error.response?.data || error.message;
  if (error.code === 'ERR_NETWORK' || error.response?.status > 500) {
    return [errorMessage, { type: actions.SET_DISCONNECTED }];
  }
  if (
    errorMessage === 'invalidate token: Token is expired' ||
    errorMessage === 'You are not logged in' ||
    errorMessage === 'the user belonging to this token no logger exists' ||
    error.response?.status > 400
  ) {
    return ['', { type: actions.LOG_OUT }];
  }
  if (errorMessage === 'Invalid email or Password') {
    return [errorMessage, { type: actions.SET_MAY_FORGET_PASSWORD, payload: { may_forget: true } }];
  }
  return [errorMessage];
}

export function* putTokenToHeader(successActions, action) {
  console.log(`token action ${JSON.stringify(action)}`);
  console.log(`token action.payload.token ${action.payload.token}`);
  setCredentails(action.payload.token);
  for (const successAction of successActions(action, null)) {
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
    if (errorMessage) {
      yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } });
    }
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
    console.log(`[OAUTH] ${JSON.stringify(result)}`);
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

export function* startActions(successActions, action) {
  for (const successAction of successActions(action)) {
    yield put(successAction);
  }
}

export function* submitGet(linkCallback, successActions, action) {
  try {
    console.log(`[HERE] Get`);

    yield put({ type: actions.SET_LOADING, payload: { loading: true } });
    const result = yield call(SERVER.get, linkCallback(action));
    console.log(`[SUCCESS] LINK ${linkCallback(action)} RESULT ${JSON.stringify(result)}`);
    for (const successAction of successActions(action, result)) {
      yield put(successAction);
    }
  } catch (error) {
    console.log(`[ERROR] LINK ${linkCallback(action)} ERROR ${JSON.stringify(error)}`);
    console.log(`[ERROR] MESSAGE ${getErrorMessage(error)}`);
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
    console.log(`submitForm: , ${link}, ${JSON.stringify(requestCallback(action))}`);
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

export function* changeLessonPriority(successActions, action) {
  if (action.payload.lesson && action.payload.lessons) {
    const base = 100 - action.payload.lesson.priority_percent;
    const sum = action.payload.lessons
      .filter((lesson) => lesson.id !== action.payload.lesson.id)
      .reduce((accumulator, lesson) => accumulator + lesson.priority_percent, 0);
    const lessons = [];

    for (const currentLesson of action.payload.lessons) {
      if (currentLesson.id !== action.payload.lesson.id) {
        lessons.push({
          ...currentLesson,
          priority_percent: sum === 0 ? 0 : (currentLesson.priority_percent / sum) * base,
        });
      } else {
        lessons.push(action.payload.lesson);
      }
    }
    console.log(`lessons ${JSON.stringify(lessons)}`);
    for (const successAction of successActions(action, lessons)) {
      yield put(successAction);
    }
  }
}
