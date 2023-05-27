import { all } from 'redux-saga/effects'
import Cookies from 'universal-cookie';
import SERVER, {setCredentails, dropCredentails} from "../actions/server";

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

export function* callServerLastest() {
  
  
    yield takeLatest("VERIFY", submitGet, action => '/api/auth/verifyemail/'+action.verifyHash, response =>  ({ 
      verified: true,
    }), 'SET_VERIFIED')
    yield takeLatest("GET_USER", getUser, action => '/api/users/me', response =>  ({ 
      user: response.data.data.user,
    }), 'SET_USER')
    yield takeLatest("SIGN_UP", submitForm, '/api/auth/register', request => request.signup, response =>  ({ 
      signed_up: true,
    }), 'SET_SIGN_UP')
    yield takeLatest("FORGOT_PASSWORD", submitForm, '/api/auth/forgotpassword', request => request.forgot, response =>  ({ 
      forgot_password: true,
    }), 'SET_FORGOT_PASSWORD')
    yield takeLatest("RESET_PASSWORD", submitForm, '/api/auth/resetpassword', request => request.reset, response =>  ({ 
      reseted: true,
    }), 'SET_RESET')
    yield takeLatest("LOG_IN", submitForm, '/api/auth/login', request => request.login, response =>  ({ 
      token: response.data.token,
    }), 'CHECK_LOG_IN')
    yield takeLatest("CHECK_LOG_IN", checkLogin)
    yield takeLatest("LOG_OUT", logOut)
    yield takeLatest("DELETE_KNOWTYPE", deleteResource, action => '/api/youknow/knowtype'+action.knowtype.id, 'GET_KNOWTYPES')
    yield takeLatest("CREATE_KNOWTYPE", postResource, '/api/youknow/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("EDIT_KNOWTYPE", postResource, '/api/youknow/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("GET_KNOWTYPES", fetchResource, '/api/youknow/knowtypes', response =>  ({ knowtypes: response.data })  , "FETCH_KNOWTYPES")
}

function* checkLogin(action) {
  if (action.payload) {
    cookies.set('token', action.payload.token, { path: '/' });
  }
  let token = cookies.get("token");
  if (token) {
    setCredentails(token)
    yield put({ type: 'GET_USER'})
  }
}

function* logOut(action) {
  cookies.remove('token');
  dropCredentails()
  yield put({ type: 'SET_USER', payload: {user: null}})
}

function* deleteResource(linkCallback, successAction, action) {
    try {
      const result = yield call(SERVER.delete, linkCallback(action))
      yield put({ type: 'GET_KNOWTYPES'})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response ? error.response.data.message : error.message}})
    }
  }


  function* getUser(linkCallback, resultCallback, successAction, action) {
    try {
      const result = yield call(SERVER.get, linkCallback(action))
      yield put({type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "LOG_OUT"})
    }
  }

  function* submitGet(linkCallback, resultCallback, successAction, action) {
    try {
      const result = yield call(SERVER.get, linkCallback(action))
      yield put({type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response ? error.response.data.message : error.message}})
    }
  }
 

  function* submitForm(link, requestCallback, resultCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response ? error.response.data.message : error.message}})
    }
  }

  function* postResource(link, requestCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({type: successAction})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response ? error.response.data.message : error.message}})
    }
  }

  function* fetchResource(link, resultCallback, successAction) {
    try {
      const result = yield call(SERVER.get, link)
      yield put({ type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.response ? error.response.data.message : error.message }})
    }
  }
   
export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

