export const reducer = (state = { knowtype: {list:[], open: null, error: false, close:false},  signed_up: false, logged_in: false}, action) => {
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
    case "SET_LOGIN": 
      return {
        ...state,
        logged_in:action.payload.logged_in
      }
    default:
      return state
  }
}