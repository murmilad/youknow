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
        ...state
      }
    case "OPEN_KNOWTYPE":
        var knowtypes = state.knowtypes.map(knowtype =>{ 
          return {...knowtype, open: knowtype.id === action.payload.id}
        })
        return {
          ...state,
          knowtypes: [
            ...knowtypes
          ]
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