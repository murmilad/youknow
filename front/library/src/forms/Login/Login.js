import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getGitHubUrl } from "../../utils/getGithubUrl"
import { getGoogleUrl } from "../../utils/getGoogleUrl"
import { Google, Github } from 'react-bootstrap-icons';

function LoginPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state)?.from.pathname) || '/';


  function goSignUp(){
    navigate("/signup");
  }

  function goReset(){
    navigate("/forgot");
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
    <h2 className="page_title">{t('header.login')}</h2>
  
    <Formik
      initialValues = {{
        email: '',
        password: '',
      }}
      onSubmit ={ (values) => {
        dispatch({type: 'LOG_IN', login: {
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
          <div className="form_element form-group field" >
            <div className="line_element ">
              <button type="submit" className="btn btn-primary" >{t('field.login-login')}</button>
            </div>
            <div className="line_element ">
              <button type="button" className="btn btn-primary" onClick={goSignUp}>{t('field.login-sign-up')}</button>
            </div>
            <div className="line_element ">
              <button type="button" className="btn btn-primary" onClick={goReset}>{t('field.login-forgot')}</button>
            </div>
            <div className="line_element ">
              <Link to={getGitHubUrl(from)}>
                <button type="button" className="btn btn-primary " ><Github /></button>
              </Link>
            </div>
            <div className="line_element ">
              <Link to={getGoogleUrl(from)}>
                <button type="button" className="btn btn-primary " ><Google /></button>
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
    
    </div>
    </>
  )
}
export default LoginPage