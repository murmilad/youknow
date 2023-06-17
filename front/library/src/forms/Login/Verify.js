import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import LoginWrapper from "./LoginWrapper";



function Verify() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  let params = useParams();
  let onSubmit = () => {
    dispatch({type: 'VERIFY', 
      verifyHash: params.verifyHash,
    })
  }

  return (
    <LoginWrapper>
      <h2 className="page_title">{t('header.verify')}</h2>
  
      <div className="form-wrapper">
        <div className="text-center form-group field">
          <button type="button" onClick={onSubmit} className="btn btn-primary" >{t('field.verify-verify')}</button>
        </div>
      </div>
    </LoginWrapper>
  )
}
export default Verify