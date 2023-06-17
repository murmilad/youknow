import {useDispatch} from "react-redux";
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';


function AddKnowtypeForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  return (
    <Formik
      enableReinitialize
      initialValues = {{
        name: '',
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'CREATE_KNOWTYPE', knowtype: {
          name: values.name,
          style: '#fff'
        }})
        props.addCallback();
        resetForm()
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
        })
      }
    >
      <Form className="create_form row" >
          <Field 
          name="name"
          > 
            {({
              field,
              form,
            }) => {
              field.onBlur = () => {
                form.submitForm();
                props.addCallback();
              };
              return (
                <input 
                  autoFocus
                  placeholder={t('field.know-type-name')}
                  className='form-control' {...field}
                   />
                
            )}}
          </Field>
      </Form>
    </Formik>
  )
}
export default AddKnowtypeForm