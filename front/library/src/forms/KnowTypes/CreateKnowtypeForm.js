import {useDispatch} from "react-redux";
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import PickerField from '../../components/PickerField'


function CreateKnowtypeForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues = {{
        name: '',
        style: "#fff",
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'CREATE_KNOWTYPE', knowtype: {
          name: values.name,
          style: values.style
        }})
        resetForm()
        setSubmitting(false)
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          style: yup.string().required(),
        })
      }
    >
      <Form className="create_form row" >
        <div className="create_form_wrapper">
          <Field name="name" > 
            {({
              field,
              form: { touched, errors },
              meta,
            }) => (
              <div className="create_input " >
                <input placeholder={t('field.know-type-name')} className="form-control" {...field} />
                {meta.touched && meta.error && ( <span className="form_error">{t('error.required')}</span>)}
              </div>
            )}
          </Field>
          <Field name="style">
            {({
              field,
              form: { touched, errors },
              meta,
            }) => (
              <div className="create_input ">
                <PickerField header={t('field.know-type-style')} value={field.value}/>
                {meta.touched && meta.error && ( <span className="form_error">{t('error.required')}</span>)}
              </div>
            )}
          </Field>
          <div className="create_input ">
            <button type="submit" className="btn btn-primary">{t('action.create-know-type')}</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateKnowtypeForm