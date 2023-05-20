import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'



function SignedUpPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  return (
    <>
    <div className="text-center">
      <img
        src="/images/logo_big.png"
        className="esc-logo slide-top center-block" alt="logo"
      />
    </div>
    <div className="wrapper _wrapper">
    <h2 className="page_title">{t('header.signed-up')}</h2>
  
    </div>
    </>
  )
}
export default SignedUpPage