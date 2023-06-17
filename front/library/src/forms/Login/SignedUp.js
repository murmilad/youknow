import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import LoginWrapper from "./LoginWrapper"



function SignedUpPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  return (
    <LoginWrapper>
    <h2 className="page_title">{t('header.signed-up')}</h2>
  
    </LoginWrapper>
  )
}
export default SignedUpPage