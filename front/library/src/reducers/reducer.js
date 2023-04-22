export const reducer = (state = { knowtypes: [], open: null }, action) => {
  switch (action.type) {
    case "FETCH_KNOWTYPES":
      return {
        ...state,
        knowtypes: [
          ...action.payload.knowtypes
        ]
      }
    case "CREATE_KNOWTYPE":
      return {
        ...state
      }
    case "OPEN_KNOWTYPE":

        return {
          ...state,
          open:action.payload.id
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