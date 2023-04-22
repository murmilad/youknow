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
    yield takeLatest("DELETE_KNOWTYPE", deleteResource, action => '/api/'+action.knowtype.id+'/knowtypes/', 'GET_KNOWTYPES')
    yield takeLatest("CREATE_KNOWTYPE", postResource, '/api/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("EDIT_KNOWTYPE", postResource, '/api/knowtypes', request => request.knowtype, 'GET_KNOWTYPES')
    yield takeLatest("GET_KNOWTYPES", fetchResource, '/api/knowtypes', response =>  ({ knowtypes: response.data })  , "FETCH_KNOWTYPES")
}
function* deleteResource(linkCallback, successAction, action) {
    try {
      const result = yield call(SERVER.delete, linkCallback(action))
      yield put({ type: 'GET_KNOWTYPES'})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }
  
  function* postResource(link, requestCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({type: successAction})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }

  function* fetchResource(link, resultCallback, successAction) {
    try {
      const result = yield call(SERVER.get, link)
      yield put({ type: successAction, payload: resultCallback(result)})
    } catch (error) {
      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }
   
export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    callServerLastest(),
  ])
}

