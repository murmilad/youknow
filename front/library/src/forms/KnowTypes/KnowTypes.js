import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

function KnowTypes() {
  const { t, i18n } = useTranslation();
  const knowtypes = useSelector(state => state.knowtypes)
  const dispatch = useDispatch()

  return (
    <ul className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <li key={idx} style={{background:knowtype.style}} className="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>{knowtype.name}</strong></span>
          <span className="pull-right">
              <button type="button" data-testid="delete-button"   className="btn btn-outline-danger btn-sm button_delete"
                      onClick={()=>dispatch({type: "DELETE_KNOWTYPE", knowtype})}>{t('action.delete-know-type')}</button>
          </span>
        </li>
      )}
    </ul>
  )
}

export default KnowTypes
