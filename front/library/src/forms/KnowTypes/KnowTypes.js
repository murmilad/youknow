import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowtypeForm from './EditKnowtypeForm'

function KnowTypes() {
  const knowtypes = useSelector(state => state.knowtypes)

  return (
    <ul className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <li key={idx} style={{background:knowtype.style}} className="list-group-item d-flex justify-content-between align-items-center">
          <EditKnowtypeForm knowtype={knowtype}/>
        </li>
      )}
    </ul>
  )
}

export default KnowTypes
