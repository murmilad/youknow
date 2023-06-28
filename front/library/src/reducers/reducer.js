export const reducer = (state = {
  knowtype: { list: [] },
  know: { list: [], open: null, error: false, close: false },
  signed_up: false,
  verified: false,
  reseted: false,
  is_loading: false,
  forgot_password: false,
  modal: {
    instanceof: null,
    error: null,
    dialog: null,
    dialog_upload: null,
  }
}, action) => {

  switch (action.type) {
    case "SET_CURRENT_STATE_KNOWTYPE":
      return {
        ...state,
        knowtype: {
          ...state.knowtype,
          current: action.payload.knowtype
        }
      }
    case "SET_STATE_KNOWTYPES":
      return {
        ...state,
        knowtype: {
          ...state.knowtype,
          list: [
            ...action.payload.knowtypes
          ],
          current: state.knowtype.current ? action.payload.knowtypes.filter((item) => item.id == state.knowtype.current.id)[0] : null
        }
      }

    case "SET_STATE_KNOWS":
      return {
        ...state,
        know: {
          ...state.know,
          list: action.payload.knows,
          hash: action.payload.knows.reduce((map, item) => (map[item.id] = item, map), {})
        }
      }

    case "UPDATE_STATE_KNOW":
      return {
        ...state,
        know: {
          ...state.know,
          hash: {
            ...state.know.hash,
            [action.payload.know.id]: action.payload.know
          }
        }
      }
    case "DELETE_STATE_KNOW":
      return {
        ...state,
        know: {
          ...state.know,
          list: state.know.list.filter(item => (item.id !== action.payload.know.id))
        }
      }

    case "CREATE_STATE_KNOW":
      return {
        ...state,
        know: {
          ...state.know,
          hash: {
            ...state.know.hash,
            [action.payload.know.id]: action.payload.know
          },
          list: [
            action.payload.know,
            ...state.know.list
          ]
        }
      }

    case "HIDE_INFO_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          info: {
            ...state.modal.info,
            isShow: false
          }
        }
      }
    case "SHOW_INFO_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          info: {
            ...state.modal.info,
            message: action.payload.message,
            isShow: true
          }
        }
      }

    case "HIDE_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          error: {
            ...state.modal.error,
            isShow: false
          }
        }
      }
    case "SHOW_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          error: {
            ...state.modal.error,
            message: action.payload.message,
            isShow: true
          }
        }
      }
    case "HIDE_DIALOG_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          dialog: {
            ...state.modal.dialog,
            isShow: false
          }
        }
      }
    case "SHOW_DIALOG_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          dialog: {
            ...state.modal.error,
            message: action.payload.message,
            header: action.payload.header,
            callback: action.payload.callback,
            isShow: true
          }
        }
      }
    case "HIDE_UPLOAD_DIALOG_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          dialog_upload: {
            ...state.modal.dialog,
            isShow: false
          }
        }
      }
    case "SHOW_UPLOAD_DIALOG_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          dialog_upload: {
            ...state.modal.error,
            message: action.payload.message,
            header: action.payload.header,
            callback: action.payload.callback,
            isShow: true
          }
        }
      }

    case "SET_SIGN_UP":
      return {
        ...state,
        signed_up: action.payload.signed_up,
      }
    case "SET_VERIFIED":
      return {
        ...state,
        verified: action.payload.verified
      }
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user
      }
    case "SET_FORGOT_PASSWORD":
      return {
        ...state,
        forgot_password: action.payload.forgot_password,
      }
    case "SET_RESET":
      return {
        ...state,
        reseted: action.payload.reseted,
      }
    case "SET_LOADING":
      return {
        ...state,
        is_loading: action.payload.loading,
      }
    default:
      return state
  }
}