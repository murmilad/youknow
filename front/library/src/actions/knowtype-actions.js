import SERVER from "./server";

export const fetchKnowtypes = async dispatch => {
    let res = await SERVER.get('/api/knowtypes')
    let knowtypes = res.data
    dispatch({type: "SET_STATE_KNOWTYPES", payload: {knowtypes}})
}

export const createKnowtype = knowtype => async dispatch => {
    await SERVER.post('/api/knowtypes', knowtype)
    dispatch(fetchKnowtypes)
}

export const removeKnowtype = id => async dispatch => {
    await SERVER.delete('/api/knowtypes/'+id)
    dispatch(fetchKnowtypes)
}
