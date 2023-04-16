import { useSelector, useDispatch } from 'react-redux'

function KnowTypes() {
  const knowtypes = useSelector(state => state.knowtypes)
  const dispatch = useDispatch()

  return (
    <ul className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>{knowtype.name}</strong> {knowtype.style}</span>
          <span className="pull-right">
              <button type="button" data-testid="delete-button"  className="btn btn-outline-danger btn-sm"
                      onClick={()=>dispatch({type: "DELETE_KNOWTYPE", knowtype})}>DELETE</button>
          </span>
        </li>
      )}
    </ul>
  )
}

export default KnowTypes
