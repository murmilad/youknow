import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowForm from './EditKnowForm'
import CreateKnowForm from './CreateKnowForm'
import WorkareaWrapper from "../WorkareaWrapper";
import { useParams } from 'react-router-dom';

function Know() {
  let params = useParams();
  
  const knowtype = useSelector(state => state.knowtype.list[params.id])
  const knows = useSelector(state => state.know.list)
  const open = useSelector(state => state.know.open)
  const error = useSelector(state => state.know.error)

  const selectableList = useRef(null);
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch({
      type: "GET_KNOWS"
      ,knowtype_id : params.id,
    });
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectableList.current && !selectableList.current.contains(event.target)) {
        if (!error)
          dispatch({type: 'CLOSE_KNOWS', payload:{close:true}})
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectableList, error])


  return (

    <WorkareaWrapper>
    <div className="wrapper _wrapper" style={{background:knowtype}}>

      <h2 className="page_title">{t('header.know')}</h2>

      <div ref={selectableList} className="list-group list">
        {knows.map((know,idx) =>
          <EditKnowForm key={idx} know={know} open={open==know.id}/>
        )}
      </div>
      <CreateKnowForm />
    </div>
    </WorkareaWrapper>
  )
}

export default Know
