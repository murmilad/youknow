import {useState} from "react";
import {createKnowtype} from "../../actions/knowtype-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';


function CreateKnowtypeForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [style, setStyle] = useState("")

  return (
    <Formik
      initialValues = {{
        name: '',
        style: '',
      }}
      onSubmit ={ values => {
        dispatch({type: 'CREATE_KNOWTYPE', knowtype: {
          name: values.name,
          style: values.style
        }})
        setName("")
        setStyle("")
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
      <Field name="name">
      {({
      field,
      form: { touched, errors },
      meta,
      }) => (
          <div className="create_input col-md-6" >
          <label htmlFor="name" className="form-label">{t('field.know-type-name')}</label>
          <input className="form-control" {...field} />
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
          <div className="create_input col-md-6">
          <label htmlFor="style" className="form-label">{t('field.know-type-style')}</label>
          <input className="form-control" {...field} />
          {meta.touched && meta.error && ( <span className="form_error">{t('error.required')}</span>)}
        </div>
      )}
      </Field>
      <div className="create_form_add_btn_wrapper">
            <button type="submit" className="btn btn-primary">{t('action.create-know-type')}</button>
        </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateKnowtypeForm