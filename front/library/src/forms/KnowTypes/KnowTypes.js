import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowtypeForm from './EditKnowtypeForm'

  
function KnowTypes() {
  const knowtypes = useSelector(state => state.knowtypes)
  const open = useSelector(state => state.open)
  const selectableList = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectableList.current && !selectableList.current.contains(event.target)) {
        dispatch({type: 'OPEN_KNOWTYPE', payload:{id:null}})
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectableList])


  return (
    <div ref={selectableList} className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <EditKnowtypeForm key={idx} knowtype={knowtype} open={open==knowtype.id}/>
      )}
    </div>
  )
}

export default KnowTypes
