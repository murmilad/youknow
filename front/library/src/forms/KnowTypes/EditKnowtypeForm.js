import {useState} from "react";
import {createKnowtype} from "../../actions/knowtype-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import PickerField from '../../components/PickerField'


function EditKnowtypeForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()


  var handleClick = () => {
    dispatch({type: 'OPEN_KNOWTYPE', payload:{id:props.knowtype.id}})
  }

  return (
    <Formik
      initialValues = {{
        id: props.knowtype.id,
        name: props.knowtype.name,
        style: props.knowtype.style,
      }}
      onSubmit ={ (values, { setSubmitting, resetForm }) => {
        dispatch({type: 'EDIT_KNOWTYPE', knowtype: {
          id: values.id,
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
      <Form className="edit_form row" onClick={handleClick}>
        <div className="edit_form_wrapper" >
          { !props.knowtype.open 
            && <>
              <span><strong>{props.knowtype.name}</strong></span>
              <span className="pull-right">
                  <button type="button" data-testid="delete-button"   className="btn btn-outline-danger btn-sm button_delete"
                          onClick={()=>dispatch({type: "DELETE_KNOWTYPE", knowtype: props.knowtype})}>{t('action.delete-know-type')}</button>
              </span>
              </>
            || <> 
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
            </>
          }
        </div>
      </Form>
    </Formik>
  )}

export default EditKnowtypeForm