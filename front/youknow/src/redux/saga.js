import { all } from 'redux-saga/effects'
import SERVER, { setCredentails, dropCredentails } from "../api/server";
import * as actions from './actions'
import googleAuthorize from '../api/google'
import githubAuthorize from '../api/github'


export function* callServerLastest() {


  yield takeLatest(actions.AUTH_GITHUB, oauth(githubAuthorize), (action, response) => [
    ({action: actions.PUT_TOKEN_HEADER, payload: {token: response.accessToken}}),
  ])

  yield takeLatest(actions.AUTH_GOOGLE, oauth(googleAuthorize), (action, response) => [
    ({action: actions.PUT_TOKEN_HEADER, payload: {token: response.accessToken}}),
  ])

  yield takeLatest(actions.VERIFY, submitGet, action => '/api/auth/verifyemail/' + action.verifyHash, (action, response) => [
    ({action: actions.SET_VERIFIED, payload: {verified: true}})
  ])
  yield takeLatest(actions.CHECK_CONNECTION, checkConnection, action => '/api/ping/', (action, response) => [
    ({action: actions.GET_USER})
  ])
  yield takeLatest(actions.CONNECT_AND_SET_PARAMS, checkConnection, action => '/api/ping/', (action, response) => [
    ({action: actions.SET_CONNECTION_PARAMS, payload: {server: action.payload.server, port: action.payload.port}}),
    ({action: actions.GET_USER})
  ])
  yield takeLatest(actions.GET_USER, getUser, action => '/api/users/me', (action, response) => [
    ({action: actions.SET_USER, payload: {user: response.data.data.user}})
  ])
  yield takeLatest(actions.SIGN_UP, submitForm, '/api/auth/register', request => request.signup, (action, response) => [
    ({action: actions.SET_SIGN_UP, payload: {signed_up: true}})
  ])
  yield takeLatest(actions.FORGOT_PASSWORD, submitForm, '/api/auth/forgotpassword', request => request.forgot, (action, response) => [
    ({action: actions.SET_FORGOT_PASSWORD, payload: {forgot_password: true}})
  ])
  yield takeLatest(actions.RESET_PASSWORD, submitForm, '/api/auth/resetpassword', request => request.reset, (action, response) => [
    ({action: actions.SET_RESET, payload: {reseted: true}})
  ])
  yield takeLatest(actions.LOG_IN, submitForm, '/api/auth/login', request => request.login, (action, response) => [
    ({action: actions.PUT_TOKEN_HEADER, payload: {token: response.data.token}})
  ])
  yield takeLatest(actions.PUT_TOKEN_HEADER, putTokenToHeader, (action, response) => [
    ({action: actions.SET_TOKEN, payload: {token: action.payload.token}})
  ])
  yield takeLatest(actions.LOG_OUT, logOut)

}



function* putTokenToHeader(successActions, action) {
    setCredentails(action.payload.token)
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
}

function* logOut(action) {
  yield put({ type: actions.REMOVE_TOKEN })
  yield put({ type: actions.SET_USER, payload: { user: null } })
  dropCredentails()
}

function* deleteResource(linkCallback, successActions, action) {
  try {
    const result = yield call(SERVER.delete, linkCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}


function* getUser(linkCallback, successActions, action) {
  try {
    const result = yield call(SERVER.get, linkCallback(action))
    yield put({ type: successAction, payload: resultCallback(result) })
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    yield put({ type: actions.LOG_OUT })
  }
}

function* checkConnection(linkCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } })
    const result = yield call(SERVER.get, linkCallback(action))
    yield put({ type: actions.SET_CONNECTED})
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } })
    yield put({ type: actions.SET_DISCONNECTED})
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } })
}

function* oauth(handler, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } })
    handler();
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } })
}

function* submitGet(linkCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } })
    const result = yield call(SERVER.get, linkCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage } })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } })
}


function* submitForm(link, requestCallback, successActions, action) {
  try {
    yield put({ type: actions.SET_LOADING, payload: { loading: true } })
    const result = yield call(SERVER.post, link, requestCallback(action))
    for (let successAction of successActions(action, result)) {
      yield put(successAction)
    }
  } catch (error) {
    const [errorMessage, errorCallback] = getErrorMessage(error);
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
  yield put({ type: actions.SET_LOADING, payload: { loading: false } })
}

function* uploadResource(linkCallback, requestCallback, successActions, action) {
  const formData = new FormData();
  yield fetch(requestCallback(action))
    .then(res => res.blob()).then(blob => {
      formData.append('file', blob);
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
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage} })
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
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage} })
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
    yield put({ type: actions.MESSAGE_ERROR, payload: { message: errorMessage} })
    if (errorCallback) {
      yield put(errorCallback);
    }
  }
}

function getErrorMessage(error) {
  let errorMessage = error.response?.data.message || error.response?.data || error.message;
  if (errorMessage === "invalidate token: Token is expired") {
    return [errorMessage, { type: actions.LOG_OUT }]
  }
  return [errorMessage];
}

export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

