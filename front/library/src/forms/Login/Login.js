import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  function goSignUp(){
    navigate("/signup");
  }

  return (
    <div className="wrapper _wrapper">
    <h2 className="page_title">{t('header.login')}</h2>
  
    <Formik
      initialValues = {{
        email: '',
        password: '',
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'LOGIN', login: {
          email: values.email,
          password: values.pass
        }})
      }}
      validationSchema = {
        yup.object().shape({
          email: yup.string().email().required(),
          pass: yup.string().required(),
        })
      }
    >
      <Form className="row" >
        <div className="form-wrapper">
          <Field name="email" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input autocomplete='email' placeholder={t('field.login-email')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback" >{t('error.email')}</span>)}
              </div>
            )}
          </Field>
          <Field name="pass">
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input type="password" placeholder={t('field.login-password')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback">{t('error.password')}</span>)}
              </div>
            )}
          </Field>
          <div className="line_element  form-group field">
            <button type="submit" className="btn btn-primary" >{t('field.login-login')}</button>
          </div>
          <div className="line_element form-group field">
            <button type="button" className="btn btn-primary" onClick={goSignUp}>{t('field.login-sign-up')}</button>
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  )
}
export default LoginPage