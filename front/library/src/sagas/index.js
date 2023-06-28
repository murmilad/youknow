import { all } from 'redux-saga/effects'
import Cookies from 'universal-cookie';
import SERVER, { setCredentails, dropCredentails } from "../actions/server";

import {
  call,
  put,
  takeEvery,
  takeLatest,
  throttle,
  take,
  fork,
  cancel,
} from 'redux-saga/effects'

const cookies = new Cookies();

function getErrorMessage(error) {
  let errorMessage = error.response?.data.message || error.response?.data || error.message;
  if (errorMessage === "invalidate token: Token is expired") {
    return [errorMessage, { type: "LOG_OUT" }]
  }
  return [errorMessage];
}

export function* callServerLastest() {


  yield takeLatest("VERIFY", submitGet, action => '/api/auth/verifyemail/' + action.verifyHash, response => ({
    verified: true,
  }), 'SET_VERIFIED')
  yield takeLatest("GET_USER", getUser, action => '/api/users/me', response => ({
    user: response.data.data.user,
  }), 'SET_USER')
  yield takeLatest("SIGN_UP", submitForm, '/api/auth/register', request => request.signup, response => ({
    signed_up: true,
  }), 'SET_SIGN_UP')
  yield takeLatest("FORGOT_PASSWORD", submitForm, '/api/auth/forgotpassword', request => request.forgot, response => ({
    forgot_password: true,
  }), 'SET_FORGOT_PASSWORD')
  yield takeLatest("RESET_PASSWORD", submitForm, '/api/auth/resetpassword', request => request.reset, response => ({
    reseted: true,
  }), 'SET_RESET')
  yield takeLatest("LOG_IN", submitForm, '/api/auth/login', request => request.login, response => ({
    token: response.data.token,
  }), 'CHECK_LOG_IN')
  yield takeLatest("CHECK_LOG_IN", checkLogin)
  yield takeLatest("LOG_OUT", logOut)

  yield takeLatest("DELETE_KNOWTYPE", deleteResource, action => '/api/youknow/knowtype/' + action.knowtype.id, action => ([{ type: 'GET_KNOWTYPES' }]))
  yield takeLatest("CREATE_KNOWTYPE", postResource, '/api/youknow/knowtype', request => request.knowtype, (action, result) => ([{ type: 'GET_KNOWTYPES', payload: { current: result.data } }]))
  yield takeLatest("EDIT_KNOWTYPE", postResource, '/api/youknow/knowtype', request => request.knowtype, action => ([{ type: 'GET_KNOWTYPES' }]))
  yield takeLatest("GET_KNOWTYPES", fetchResource, action => '/api/youknow/knowtypes', response => { }, (action, result) => {
    if (action.payload?.current) {
      return ([{ type: 'SET_STATE_KNOWTYPES', payload: { knowtypes: result.data } }, { type: 'SET_CURRENT_STATE_KNOWTYPE', payload: { knowtype: action.payload?.current } }])
    } else {
      return ([{ type: 'SET_STATE_KNOWTYPES', payload: { knowtypes: result.data } }])
    }
  })

  yield takeLatest("DELETE_KNOW", deleteResource, action => '/api/youknow/know/' + action.know.id, (action, result) => ([{ type: 'DELETE_STATE_KNOW', payload: { know: result.data } }]))
  yield takeLatest("CREATE_KNOW", postResource, '/api/youknow/know', request => request.know, (action, result) => ([{ type: 'CREATE_STATE_KNOW', payload: { know: result.data } }]))
  yield takeLatest("EDIT_KNOW", postResource, '/api/youknow/know', request => request.know, (action, result) => ([{ type: 'UPDATE_STATE_KNOW', payload: { know: result.data } }]))
  yield takeLatest("GET_KNOWS", fetchResource, action => '/api/youknow/knows/' + action.knowtype_id, response => { }, (action, result) => ([{ type: 'SET_STATE_KNOWS', payload: { knows: result.data } }]))
  yield takeLatest("UPLOAD_KNOWS", uploadResource, action => '/api/youknow/knowtypes/' + action.knowtype.id, request => request.payload.file, (action, result) => ([
    { type: 'GET_KNOWS', knowtype_id: action.knowtype.id },
    { type: "HIDE_UPLOAD_DIALOG_MODAL" },
    { type: "SHOW_INFO_MODAL", payload: { message: result.data.message } }]))
}

function* checkLogin(action) {
  if (action.payload) {
    cookies.set('token', action.payload.token, { path: '/' });
  }
  let token = cookies.get("token");
  if (token) {
    setCredentails(token)
    yield put({ type: 'GET_USER' })
  }
}

function* logOut(action) {
  cookies.remove('token');
  dropCredentails()
  yield put({ type: 'SET_USER', payload: { user: null } })
}

function* deleteResource(linkCallback, successActions, action) {
  try {
    const result = yield call(SERVER.delete, linkCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage } })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}


function* getUser(linkCallback, resultCallback, successAction, action) {
  try {
    const result = yield call(SERVER.get, linkCallback(action))
    yield put({ type: successAction, payload: resultCallback(result) })
  } catch (error) {
    yield put({ type: "LOG_OUT" })
  }
}

function* submitGet(linkCallback, resultCallback, successAction, action) {
  try {
    yield put({ type: 'SET_LOADING', payload: { loading: true } })
    const result = yield call(SERVER.get, linkCallback(action))
    yield put({ type: successAction, payload: resultCallback(result) })
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage } })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: 'SET_LOADING', payload: { loading: false } })
}


function* submitForm(link, requestCallback, resultCallback, successAction, action) {
  try {
    yield put({ type: 'SET_LOADING', payload: { loading: true } })
    const result = yield call(SERVER.post, link, requestCallback(action))
    yield put({ type: successAction, payload: resultCallback(result) })
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: 'SET_LOADING', payload: { loading: false } })
}

function* uploadResource(linkCallback, requestCallback, successActions, action) {
  const formData = new FormData();
  yield fetch(requestCallback(action))
    .then(res => res.blob()).then(blob => {
      formData.append("file", blob);
    }
    )
  try {
    const result = yield call(SERVER.post, linkCallback(action), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

function* postResource(link, requestCallback, successActions, action) {
  try {
    const result = yield call(SERVER.post, link, requestCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

function* fetchResource(linkCallback, resultCallback, successActions, action) {
  try {
    const result = yield call(SERVER.get, linkCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

