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
    <div onClick={handleClick} key={props.idx} style={{background:props.knowtype.style}} className="list-group-item d-flex justify-content-between align-items-center">

    <Formik
      initialValues = {{
        id: props.knowtype.id,
        name: props.knowtype.name,
        style: props.knowtype.style,
      }}
      enableReinitialize
      onSubmit ={ values => {
        dispatch({type: 'EDIT_KNOWTYPE', knowtype: {
          id: values.id,
          name: values.name,
          style: values.style
        }})
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          style: yup.string().required(),
        })
      }
    >
      <Form className="edit_form row" >
        <div className="edit_form_wrapper" >
          { !props.open 
            && <>
              <div className="line_element"><strong>{props.knowtype.name}</strong></div>
              </>
            || <> 
              <Field name="name" > 
                {({
                  field,
                  form,
                  meta,
                }) => (
                  <div className="create_input line_element" >
                    <input  placeholder={t('field.know-type-name')} className="form-control" {...field} onChange={(e) => {
                      field.onChange(e)
                      form.submitForm()
                    }}/>
                    {meta.touched && meta.error && ( <span className="form_error">{t('error.required')}</span>)}
                  </div>
                )}
              </Field>
              <Field name="style">
                {({
                  field,
                  form,
                  meta,
                }) => (
                  <div className="create_input line_element">
                    <PickerField header={t('field.know-type-style')} value={field.value} onChange={(e)=>
                      form.submitForm()
                    }/>
                    {meta.touched && meta.error && ( <span className="form_error">{t('error.required')}</span>)}
                  </div>
                )}
              </Field>
            </>
          }
          <div className="line_element">
              <button type="button" data-testid="delete-button"   className="btn btn-outline-danger btn-sm button_delete"
                      onClick={()=>dispatch({type: "DELETE_KNOWTYPE", knowtype: props.knowtype})}>{t('action.delete-know-type')}</button>
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  )}

export default EditKnowtypeForm