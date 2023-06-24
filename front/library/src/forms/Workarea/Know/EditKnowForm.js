import { useState, useEffect, useRef } from "react";
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import TextArea from 'textarea-autosize-reactjs';



function EditKnowForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingValue, setIsEditingValue] = useState(false);

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">

      <Formik
        initialValues={{
          id: props.know.id,
          name: props.know.name,
          value: props.know.value,
          knowtype_id: props.knowtypeId
        }}
        enableReinitialize
        onSubmit={(values) => {
          dispatch({
            type: 'EDIT_KNOW', know: {
              id: values.id,
              name: values.name,
              value: values.value,
              knowtype_id: props.knowtypeId
            }
          })
        }}
        validationSchema={
          yup.object().shape({
            name: yup.string().required(),
            value: yup.string().required(),
          })
        }
      >{({ touched, errors, handleSubmit, isSubmitting, isValidating }) => (
        <Form
          className="edit_form row "
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 'Enter' ) {
              setIsEditingName(false)
              setIsEditingValue(false);
              handleSubmit();
            }
          }}>
          <div style={{ display: 'flex' }}>
            {!isEditingName
              &&
              <div className="w-50 m-2 float-left" onClick={() => { setIsEditingName(true) }}><strong className="css-fix">{props.know.name}</strong></div>
              ||
              <div className="w-50 m-2 float-left" >
                <Field name="name">
                  {({ field, form }) => {
                    field.onBlur = () => {
                      form.submitForm();
                      if (!errors.name) {
                        setIsEditingName(false);
                      }
                    }
                    return (<TextArea onKeyDown={(e) => {
                      if (e.key === "Tab") {
                        e.preventDefault();
                        form.submitForm();
                        if (!errors.name) {
                          setIsEditingName(false);
                          setIsEditingValue(true);
                        }
                      }
                    }} autoFocus placeholder={t('field.know-name')} className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'} {...field} />)
                  }}
                </Field>
                {touched.name && errors.name && (<div className="invalid-feedback">{t('error.required')}</div>)}
              </div>
            }
            {!isEditingValue
              &&
              <div className="w-50 m-2 float-left" onClick={() => { setIsEditingValue(true) }}><strong className="css-fix">{props.know.value}</strong></div>
              ||
              <div className="w-50 m-2 float-left" >
                <Field name="value"  >
                  {({ field, form }) => {
                    field.onBlur = () => {
                      form.submitForm();
                      if (!errors.value) {
                        setIsEditingValue(false);
                      }
                    }
                    return (<TextArea onKeyDown={(e) => {
                      if (e.shiftKey && e.key === "Tab") {
                        e.preventDefault();
                        form.submitForm();
                        if (!errors.value) {
                          setIsEditingValue(false);
                          setIsEditingName(true);
                        }
                      }
                    }} autoFocus placeholder={t('field.know-value')} className={(touched.value && errors.value) ? 'form-control is-invalid' : 'form-control'} {...field} />)
                  }}
                </Field>
                {touched.value && errors.value && (<div className="invalid-feedback">{t('error.required')}</div>)}
              </div>
            }
            <div className="m-2 float-left">
              <Button tabIndex="-1" onClick={() => {
                dispatch({ type: "DELETE_KNOW", know: props.know })
              }} variant="outline-danger" >{t('action.delete-know')}</Button>
            </div>
          </div>
        </Form>
      )}
      </Formik>
    </div>
  )
}

export default EditKnowForm