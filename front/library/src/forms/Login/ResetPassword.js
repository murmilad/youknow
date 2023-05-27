import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function ResetPasswordPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  let params = useParams();

  const reseted = useSelector(state => state.reseted)

  const navigate = useNavigate();
  function goLogin(){
    navigate("/login");
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
    {reseted 
      ? <>
        <h2 className="page_title">{t('header.reseted')}</h2>
        <div className="line_element form-group field">
          <button type="button" className="btn btn-primary" onClick={goLogin}>{t('field.user-back-to-login')}</button>
        </div>
        </>
      : 
      <>


        <h2 className="page_title">{t('header.sign-up')}</h2>
      
        <Formik
          initialValues = {{
            resetPassword: '',
            resetPasswordConfirm: '',
          }}
          onSubmit ={ (values, { setSubmitting, resetForm }) => {
            dispatch({type: 'RESET_PASSWORD', reset: {
              verifyHash: params.verifyHash,
              password: values.resetPassword,
              passwordConfirm: values.resetPasswordConfirm,
            }})
          }}
          validationSchema = {
            yup.object().shape({
              resetPassword: yup.string().required().min(8, t('error.password-short'))
              .matches(/[a-zA-Z]/, t('error.password-letters')),
              resetPasswordConfirm: yup.string().required().min(8, t('error.password-short'))
              .matches(/[a-zA-Z]/, t('error.password-letters')).test(
                'passwords-match', 
                t('error.password-match'), 
                function (value) { return this.parent.resetPassword === value}
              )
            })
          }
        >
          <Form className="row" >
            <div className="form-wrapper">
            <Field name="resetPassword">
                {({
                  field,
                  meta,
                }) => (
                  <div className="form_element form-group field" >
                    <input autocomplete='new-password' type="password" placeholder={t('field.user-password')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                    {meta.touched && meta.error && ( <span className="invalid-feedback">{ meta.error }</span>)}
                  </div>
                )}
              </Field>
              <Field name="resetPasswordConfirm">
                {({
                  field,
                  meta,
                }) => (
                  <div className="form_element form-group field" >
                    <input autocomplete='new-password' type="password" placeholder={t('field.user-retype-password')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                    {meta.touched && meta.error && ( <span className="invalid-feedback">{ meta.error }</span>)}
                  </div>
                )}
              </Field>
              <div className="line_element form-group field">
                <button type="submit" className="btn btn-primary" >{t('field.reset-reset-password')}</button>
              </div>
              <div className="line_element form-group field">
                <button type="button" className="btn btn-primary" onClick={goLogin}>{t('field.user-back-to-login')}</button>
              </div>
            </div>
          </Form>
        </Formik>
      </>
    }
    </div>
    </>
  )
}
export default ResetPasswordPage