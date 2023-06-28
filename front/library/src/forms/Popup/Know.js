import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import EditKnowForm from './EditKnowForm'
import CreateKnowForm from './CreateKnowForm'
import WorkareaWrapper from "../WorkareaWrapper";
import { Spinner } from 'react-bootstrap'

function Know() {

  const knowtype = useSelector(state => state.knowtype.current)
  const knows = useSelector(state => state.know.list)

  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  let [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if (knowtype) {
      setIsLoading(true);
      dispatch({
        type: "GET_KNOWS"
        , knowtype_id: knowtype.id
      });
    }
  }, [knowtype])

  useEffect(() => {
    if (knowtype) {
      setIsLoading(false);
    }
  }, [knows])

  return (
    <WorkareaWrapper knowType={knowtype}>
      {knowtype &&
        <div className="wrapper _wrapper" style={{ background: knowtype.style }}>

          <h2 className="page_title">{knowtype.name}</h2>

          <CreateKnowForm knowtypeId={knowtype.id} />
          {isLoading &&
            <div className="list-group list align-items-center " >
              <Spinner animation="border" variant="primary" role="status" />
            </div>
          }
          <div className={"list-group list" + (isLoading && " d-none")}>
            {knows.map((know, idx) =>
              <EditKnowForm knowtypeId={knowtype.id} key={know.id} id={know.id} />
            )}
          </div>
        </div>
      }
    </WorkareaWrapper>
  )
}

export default Know
