export const reducer = (state = { knowtype: {list:[], open: null, error: false, close:false},  }, action) => {
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

    default:
      return state
  }
}