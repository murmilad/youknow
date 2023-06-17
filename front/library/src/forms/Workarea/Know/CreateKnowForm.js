import { useSelector, useDispatch } from 'react-redux'
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';


function CreateKnowForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues = {{
        name: '',
        value: '',
        knowtype_id: props.knowtypeId
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'CREATE_KNOW', know: {
          name: values.name,
          value: values.value,
          knowtype_id: props.knowtypeId
        }})
        resetForm()
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          value: yup.string().required(),
        })
      }
    >
      <Form className="create_form row" >
        <div className="form-wrapper">
          <Field name="name" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element horizontal form-group" >
                <input placeholder={t('field.know-name')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback">{t('error.required')}</span>)}
              </div>
            )}
          </Field>
          <Field name="value" > 
            {({
              field,
              meta,
            }) => (
              <div className="form_element horizontal form-group" >
                <input placeholder={t('field.know-value')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} {...field} />
                {meta.touched && meta.error && ( <span className="invalid-feedback">{t('error.required')}</span>)}
              </div>
            )}
          </Field>
          <div className="form_element form-group">
            <button type="submit" className="btn btn-primary" >{t('action.create-know')}</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
export default CreateKnowForm