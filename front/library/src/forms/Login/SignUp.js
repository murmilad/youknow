import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";
import FormPage from "../Form";


function SignUpPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  function goLogin(){
    navigate("/login");
  }

  return (
    <FormPage>
    <h2 className="page_title">{t('header.sign-up')}</h2>
  
    <Formik
      initialValues = {{
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupPasswordConfirm: '',
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'SIGN_UP', signup: {
          name: values.signupName,
          email: values.signupEmail,
          password: values.signupPassword,
          passwordConfirm: values.signupPasswordConfirm,
          }})
      }}
      validationSchema = {
        yup.object().shape({
          signupName: yup.string().required(),
          signupEmail: yup.string().email().required(),
          signupPassword: yup.string().required().min(8, t('error.password-short'))
          .matches(/[a-zA-Z]/, t('error.password-letters')),
          signupPasswordConfirm: yup.string().required().min(8, t('error.password-short'))
          .matches(/[a-zA-Z]/, t('error.password-letters')).test(
            'passwords-match', 
            t('error.password-match'), 
            function (value) { return this.parent.signupPassword === value}
          )
        })
      }
    >
      <Form className="row" >
        <div className="form-wrapper">
        <Field name="signupName" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input autocomplete='name' placeholder={t('field.user-name')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback" >{t('error.name')}</span>)}
              </div>
            )}
          </Field>
          <Field name="signupEmail" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input autocomplete='email' placeholder={t('field.user-email')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback" >{t('error.email')}</span>)}
              </div>
            )}
          </Field>
          <Field name="signupPassword">
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
          <Field name="signupPasswordConfirm">
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
            <button type="submit" className="btn btn-primary" >{t('field.user-sign-up')}</button>
          </div>
          <div className="line_element form-group field">
            <button type="button" className="btn btn-primary" onClick={goLogin}>{t('field.user-back-to-login')}</button>
          </div>
        </div>
      </Form>
    </Formik>
    </FormPage>
  )
}
export default SignUpPage