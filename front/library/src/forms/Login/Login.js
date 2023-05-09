import {Formik, Field, Form} from "formik"
import { useSelector, useDispatch } from 'react-redux'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'



function LoginPage() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const login_incorrect = useSelector(state => state.login_incorrect)
  
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
          { login_incorrect && <div className="text-danger" >{t('message.login_incorrect')}</div> }
          <Field name="email" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input placeholder="E-Mail" className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback" >Please enter correct email</span>)}
              </div>
            )}
          </Field>
          <Field name="pass">
            {({
              field,
              meta,
            }) => (
              <div className="form_element form-group field" >
                <input type="password" placeholder="Password" className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback">Please enter password</span>)}
              </div>
            )}
          </Field>
          <div className="form_element form-group field">
            <button type="submit" className="btn btn-primary" >Log-in</button>
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  )
}
export default LoginPage