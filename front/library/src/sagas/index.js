import { all } from 'redux-saga/effects'

import SERVER from "../actions/server";

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


export function* callServerLastest() {
  
  
    yield takeLatest("VERIFY", submitFormGet, action => '/api/auth/verifyemail/'+action.verifyHash, response =>  ({ 
      verified: true,
    }), 'SET_VERIFIED')
    yield takeLatest("SIGN_UP", submitForm, '/api/auth/register', request => request.signup, response =>  ({ 
      signed_up: true,
    }), 'SET_SIGN_UP')
    yield takeLatest("LOGIN", submitForm, '/api/auth/login', request => request.login, response =>  ({ 
      logged_in: response.data.token,
    }), 'SET_LOGIN')
    yield takeLatest("DELETE_KNOWTYPE", deleteResource, action => '/api/youknow/knowtype'+action.knowtype.id, 'GET_KNOWTYPES')
    yield takeLatest("CREATE_KNOWTYPE", postResource, '/api/youknow/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("EDIT_KNOWTYPE", postResource, '/api/youknow/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("GET_KNOWTYPES", fetchResource, '/api/youknow/knowtypes', response =>  ({ knowtypes: response.data })  , "FETCH_KNOWTYPES")
}
function* deleteResource(linkCallback, successAction, action) {
    try {
      const result = yield call(SERVER.delete, linkCallback(action))
      yield put({ type: 'GET_KNOWTYPES'})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response.data.message}})
    }
  }

  function* submitFormGet(linkCallback, resultCallback, successAction, action) {
    try {
      const result = yield call(SERVER.get, linkCallback(action))
      yield put({type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response.data.message}})
    }
  }
 

  function* submitForm(link, requestCallback, resultCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response.data.message}})
    }
  }

  function* postResource(link, requestCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({type: successAction})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response.data.message}})
    }
  }

  function* fetchResource(link, resultCallback, successAction) {
    try {
      const result = yield call(SERVER.get, link)
      yield put({ type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response.data.message}})
    }
  }
   
export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

