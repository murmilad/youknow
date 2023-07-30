import {combineReducers} from 'redux'
import * as actions from './actions'


const merge = (prev, next) => Object.assign({}, prev, next )

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_SIGN_UP:
          return merge(state, {signed_up: action.payload})
        case actions.SET_VERIFIED:
          return merge(state, {verified: action.payload})
        case actions.SET_USER:
          return merge(state, {user: action.payload})
        case actions.SET_FORGOT_PASSWORD:
          return merge(state, {forgot_password: action.payload})
        case actions.SET_RESET:
            return merge(state, {reseted: action.payload})
        case actions.SET_LOADING:
            return merge(state, {is_loading: action.payload})
        case actions.SET_TOKEN:
            return merge(state, {token: action.payload})
        case actions.REMOVE_TOKEN:
            return {
                ...state,
                token: null
            }    
        default:
          return state
      }     
}

const messageReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.MESSAGE_START:
            return {...state, loading: true}
        case actions.MESSAGE_SUCCESS:
            return {...state, loading: false}
        case actions.MESSAGE_ERROR:
            return {...state, loading: false, error: action.payload.message}
        case actions.MESSAGE_CLEAN:
            return {}
        default:
            return state
    }
}

const statusReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.SET_CONNECTED:
            return merge(state, {connected: action.payload})
        case actions.SET_DISCONNECTED:
            return merge(state, {connected: action.payload})
        case actions.SET_CONNECTION_PARAMS:
            return merge(state, {server: action.payload.server, port: action.payload.port})
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    status: statusReducer,
})
  
export default reducer