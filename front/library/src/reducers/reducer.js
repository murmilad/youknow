export const reducer = (state = { 
  knowtype: {list:[], open: null, error: false, close:false},
  signed_up: false,
  verified: false,
  reseted: false,
  is_loading: false,
  forgot_password: false
}, action) => {

  switch (action.type) {
    case "FETCH_KNOWTYPES":
      return {
        ...state,
        knowtype: {
          ...state.knowtype,
          list:[
            ...action.payload.knowtypes
          ]
        }
      }
    case "CREATE_KNOWTYPE":
      return {
        ...state
      }
    case "OPEN_KNOWTYPE":

        return {
          ...state,
          knowtype: {
            ...state.knowtype,
            open:action.payload.id
          }
        }
    case "CLOSE_KNOWTYPES":
      return {
        ...state,
        knowtype: {
          ...state.knowtype,
          close:action.payload.close
        }
    }
    case "ERROR_KNOWTYPE":
      return {
        ...state,
        knowtype: {
          ...state.knowtype,
          error:action.payload.error
        }
      }
    case "HIDE_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: false
        }
      }
    case "SHOW_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          message: action.payload.message,
          isShow: true
        }
      }
    case "SET_SIGN_UP": 
      return {
        ...state,
        signed_up:action.payload.signed_up,
      }
    case "SET_VERIFIED": 
      return {
        ...state,
        verified:action.payload.verified
      }
    case "SET_USER": 
      return {
        ...state,
        user:action.payload.user
      }
    case "SET_FORGOT_PASSWORD": 
      return {
        ...state,
        forgot_password:action.payload.forgot_password,
      }
    case "SET_RESET": 
      return {
        ...state,
        reseted:action.payload.reseted,
      }
    case "SET_LOADING": 
      return {
        ...state,
        is_loading:action.payload.loading,
      }
    default:
      return state
  }
}