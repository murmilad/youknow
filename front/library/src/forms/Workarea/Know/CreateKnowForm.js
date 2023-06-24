import React, { useRef, useEffect } from "react";
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form } from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import TextArea from 'textarea-autosize-reactjs';


function CreateKnowForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  useEffect(() => {
    form.resetForm();
  }, [props.knowtypeId])

  let form;
  return (
    <Formik
      validateOnBlur={false}
      innerRef={(p) => (form = p)}
      initialValues={{
        name: '',
        value: '',
        knowtype_id: props.knowtypeId
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch({
          type: 'CREATE_KNOW', know: {
            name: values.name,
            value: values.value,
            knowtype_id: props.knowtypeId
          }
        })
        resetForm()
      }}
      validationSchema={
        yup.object().shape({
          name: yup.string().required(),
          value: yup.string().required(),
        })
      }
    >{({ touched, errors, handleSubmit, isSubmitting, isValidating }) => (
      <Form
        className="create_form row"
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === 'Enter' && !isSubmitting) {

            handleSubmit();
          }
        }}>
        <div style={{ display: 'flex' }}>
          <div className="w-50 m-2 float-left" >
            <Field name="name"  >
              {({ field }) => (
                <TextArea placeholder={t('field.know-name')} className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'} {...field} />
              )}
            </Field>
            {touched.name && errors.name && (<div className="invalid-feedback">{t('error.required')}</div>)}
          </div>
          <div className="w-50 m-2 float-left" >
            <Field name="value"  >
              {({ field }) => (
                <TextArea placeholder={t('field.know-value')} className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'} {...field} />
              )}
            </Field>
            {touched.value && errors.value && (<div className="invalid-feedback">{t('error.required')}</div>)}
          </div>
          <div className="m-2 float-left">
            <Button onClick={() => {
              handleSubmit();
            }} variant="primary" >{t('action.create-know')}</Button>
          </div>
        </div>
      </Form>
    )
      }
    </Formik>
  )
}
export default CreateKnowForm