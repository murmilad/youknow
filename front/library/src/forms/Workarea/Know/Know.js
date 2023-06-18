import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowForm from './EditKnowForm'
import CreateKnowForm from './CreateKnowForm'
import WorkareaWrapper from "../WorkareaWrapper";

function Know() {

  const knowtype = useSelector(state => state.knowtype.current)
  const knows = useSelector(state => state.know.list)
  const open = useSelector(state => state.know.open)
  const error = useSelector(state => state.know.error)

  const selectableList = useRef(null);
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();


  useEffect(() => {
    if (knowtype) {
      dispatch({
        type: "GET_KNOWS"
        , knowtype_id: knowtype.id
      });
    }
  }, [knowtype])

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectableList.current && !selectableList.current.contains(event.target)) {
        if (!error)
          dispatch({ type: 'CLOSE_KNOWS', payload: { close: true } })
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectableList, error])


  return (
    <WorkareaWrapper knowType={knowtype}>
      {knowtype  &&
        <div className="wrapper _wrapper" style={{ background: knowtype.style }}>

          <h2 className="page_title">{knowtype.name}</h2>

          <CreateKnowForm knowtypeId={knowtype.id} />
          <div ref={selectableList} className="list-group list">
            {knows.map((know, idx) =>
              <EditKnowForm knowtypeId={knowtype.id} key={idx} know={know} open={open == know.id} />
            )}
          </div>
        </div>
      }
    </WorkareaWrapper>
  )
}

export default Know
