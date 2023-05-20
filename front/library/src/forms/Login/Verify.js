import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';



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
    <>
    <div className="text-center">
      <img
        src="/images/logo_big.png"
        className="esc-logo slide-top center-block" alt="logo"
      />
    </div>
    <div className="wrapper _wrapper">
    <h2 className="page_title">{t('header.verify')}</h2>
  
        <div className="form-wrapper">
          <div className="text-center form-group field">
            <button type="button" onClick={onSubmit} className="btn btn-primary" >{t('field.verify-verify')}</button>
          </div>
        </div>
    </div>
    </>
  )
}
export default Verify