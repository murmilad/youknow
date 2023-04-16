export const reducer = (state = { knowtypes: [], selections: { data: [] } }, action) => {
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
        ...state,
        selections: {
          ...state.selections,
          isPending: false,
          newSelection: null
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