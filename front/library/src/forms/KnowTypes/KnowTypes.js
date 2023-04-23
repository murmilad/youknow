import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowtypeForm from './EditKnowtypeForm'

  
function KnowTypes() {
  const knowtypes = useSelector(state => state.knowtype.list)
  const open = useSelector(state => state.knowtype.open)
  const error = useSelector(state => state.knowtype.error)
  
  const selectableList = useRef(null);
  const dispatch = useDispatch()
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectableList.current && !selectableList.current.contains(event.target)) {
        if (!error)
          dispatch({type: 'CLOSE_KNOWTYPES', payload:{close:true}})
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectableList, error])


  return (
    <div ref={selectableList} className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <EditKnowtypeForm key={idx} knowtype={knowtype} open={open==knowtype.id}/>
      )}
    </div>
  )
}

export default KnowTypes
