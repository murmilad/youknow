import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getGitHubUrl } from "../../utils/getGithubUrl"
import { getGoogleUrl } from "../../utils/getGoogleUrl"
import { Google, Github } from 'react-bootstrap-icons';
import FormPage from "../Form";

function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const forgot_password = useSelector(state => state.forgot_password)


  

  function goLogin(){
    navigate("/login");
  }

  return (
    <FormPage>
    {forgot_password 
      ? 
        <h2 className="page_title">{t('header.email-sent')}</h2>
      : <>
        <h2 className="page_title">{t('header.forgot-password')}</h2>
      
        <Formik
          initialValues = {{
            email: '',
          }}
          onSubmit ={ (values) => {
            dispatch({type: 'FORGOT_PASSWORD', forgot: {
              email: values.email
            }})
          }}
          validationSchema = {
            yup.object().shape({
              email: yup.string().email().required()
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
                    <input autocomplete='email' placeholder={t('field.forgot-email')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                    {meta.touched && meta.error && ( <span className="invalid-feedback" >{t('error.email')}</span>)}
                  </div>
                )}
              </Field>
              <div className="form_element form-group field" >
                <div className="line_element ">
                  <button type="submit" className="btn btn-primary" >{t('field.forgot-retrieve-password')}</button>
                </div>
                <div className="line_element ">
                  <button type="button" className="btn btn-primary" onClick={goLogin}>{t('field.user-back-to-login')}</button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </>
    }
    
    </FormPage>

  )
}
export default ForgotPasswordPage