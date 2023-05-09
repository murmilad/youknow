import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowtypeForm from './EditKnowtypeForm'
import CreateKnowtypeForm from './CreateKnowtypeForm'
  
function KnowTypes() {
  const knowtypes = useSelector(state => state.knowtype.list)
  const open = useSelector(state => state.knowtype.open)
  const error = useSelector(state => state.knowtype.error)
  
  const selectableList = useRef(null);
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  
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
    <div className="wrapper _wrapper">
    <h2 className="page_title">{t('header.know-types')}</h2>

    <div ref={selectableList} className="list-group list">
      {knowtypes.map((knowtype,idx) =>
        <EditKnowtypeForm key={idx} knowtype={knowtype} open={open==knowtype.id}/>
      )}
    </div>
    <CreateKnowtypeForm />
    </div>
  )
}

export default KnowTypes
