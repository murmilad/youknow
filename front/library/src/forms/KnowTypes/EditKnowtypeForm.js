import {useState} from "react";
import {createKnowtype} from "../../actions/knowtype-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import PickerField from '../../components/PickerField'


function EditKnowtypeForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [style, setStyle] = useState("")

  return (
    <Formik
      initialValues = {{
        name: '',
        style: "#fff",
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
        </div>
      </Form>
    </Formik>
  )
}

export default EditKnowtypeForm