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
  return error.response?.data.message || error.response?.data || error.message
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

  yield takeLatest("DELETE_KNOWTYPE", deleteResource, action => '/api/youknow/knowtype/' + action.knowtype.id, action => ({ type: 'GET_KNOWTYPES' }))
  yield takeLatest("CREATE_KNOWTYPE", postResource, '/api/youknow/knowtype', request => request.knowtype, (action, result) => ({ type: 'GET_KNOWTYPES', payload:{current : result.data} }))
  yield takeLatest("EDIT_KNOWTYPE", postResource, '/api/youknow/knowtype', request => request.knowtype, action => ({ type: 'GET_KNOWTYPES' }))
  yield takeLatest("GET_KNOWTYPES", fetchResource, action => '/api/youknow/knowtypes', response => {}, (action, result) => {
    if (action.payload?.current) {
      return ([{ type: 'FETCH_KNOWTYPES', payload: {knowtypes: result.data}},{type: 'SET_CURRENT_KNOWTYPE', payload:{knowtype: action.payload?.current}}])
    }else{
      return ([{ type: 'FETCH_KNOWTYPES', payload: {knowtypes: result.data}}])
    }
  })

  yield takeLatest("DELETE_KNOW", deleteResource, action => '/api/youknow/know/' + action.know.id, action => ({type: 'GET_KNOWS', knowtype_id : action.know.knowtype_id }))
  yield takeLatest("CREATE_KNOW", postResource, '/api/youknow/know', request => request.know, action => ({type: 'GET_KNOWS', knowtype_id : action.know.knowtype_id }))
  yield takeLatest("EDIT_KNOW", postResource, '/api/youknow/know', request => request.know, action => ({type: 'GET_KNOWS', knowtype_id : action.know.knowtype_id }))
  yield takeLatest("GET_KNOWS", fetchResource, action => '/api/youknow/knows/' + action.knowtype_id, response => {}, (action, result) => ([{ type: 'FETCH_KNOWS', payload: {knows: result.data}}]))
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

function* deleteResource(linkCallback, successAction, action) {
  try {
    const result = yield call(SERVER.delete, linkCallback(action))
    yield put(successAction(action, result))
  } catch (error) {
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: getErrorMessage(error) } })
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
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: getErrorMessage(error) } })
  }
  yield put({ type: 'SET_LOADING', payload: { loading: false } })
}


function* submitForm(link, requestCallback, resultCallback, successAction, action) {
  try {
    yield put({ type: 'SET_LOADING', payload: { loading: true } })
    const result = yield call(SERVER.post, link, requestCallback(action))
    yield put({ type: successAction, payload: resultCallback(result) })
  } catch (error) {
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: getErrorMessage(error) } })
  }
  yield put({ type: 'SET_LOADING', payload: { loading: false } })
}

function* postResource(link, requestCallback, successAction, action) {
  try {
    const result = yield call(SERVER.post, link, requestCallback(action))
    yield put(successAction(action, result))
  } catch (error) {
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: getErrorMessage(error) } })
  }
}

function* fetchResource(linkCallback, resultCallback, successActions, action) {
  try {
    const result = yield call(SERVER.get, linkCallback(action))
    for (let successAction of successActions(action,result)) {
      yield put(successAction)
    }
  } catch (error) {
    yield put({ type: "SHOW_ERROR_MODAL", payload: { message: getErrorMessage(error) } })
  }
}

export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

