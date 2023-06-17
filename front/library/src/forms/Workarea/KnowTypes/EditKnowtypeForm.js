import {useState} from "react";
import {createKnowtype} from "../../../actions/knowtype-actions";
import {useSelector, useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import PickerField from '../../../components/PickerField'
import ErrorInterceptor from '../../../components/ErrorInterceptor'


function EditKnowtypeForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const error = useSelector(state => state.knowtype.error)
  const close = useSelector(state => state.knowtype.close)
  const open = useSelector(state => state.knowtype.open)


  var handleClick = () => {
    if (!error){
      if (props.knowtype.id == open) {
        dispatch({type: 'OPEN_KNOWTYPE', payload:{id:null}})
      } else
        dispatch({type: 'OPEN_KNOWTYPE', payload:{id:props.knowtype.id}})
    }
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
      onSubmit ={ (values)=> {
        dispatch({type: 'EDIT_KNOWTYPE', knowtype: {
          id: values.id,
          name: values.name,
          style: values.style
        }})
        if (close) {
          dispatch({type: 'OPEN_KNOWTYPE', payload:{id:null}})
          dispatch({type: 'CLOSE_KNOWTYPES', payload:{close:false}})
        }
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          style: yup.string().required(),
        })
      }
    >
      <Form className="edit_form row" >
        
        <div className="edit_form_wrapper form-wrapper" >
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
                  <div className="line_element form-group" >
                    <input 
                      autoFocus 
                      placeholder={t('field.know-type-name')} 
                      className={(meta.error) ? 'form-control is-invalid' : 'form-control'} 
                      {...field}
                      onClick={(e)=>e.stopPropagation()} 
                      onBlur={(e) => {
                          form.submitForm()
                          if (!form.isValid)
                            dispatch({type: 'CLOSE_KNOWTYPES', payload:{close:false}})
                          dispatch({type: 'ERROR_KNOWTYPE', payload:{error:!form.isValid}})
                      }}/>
                  </div>
                )}
              </Field>
              <Field name="style">
                {({
                  field,
                  form,
                  meta,
                }) => (
                  <div className="line_element form-group">
                    <PickerField header={t('field.know-type-style')} className={(meta.touched && meta.error) ? 'form-control is-invalid' : 'form-control'} value={field.value} onChange={(e)=>{
                      dispatch({type: 'CLOSE_KNOWTYPES', payload:{close:true}})
                      form.submitForm()
                    }}/>
                  </div>
                )}
              </Field>
            </>
          }
          <button style={{display:'none'}} type="submit"/>

          <div className="line_element form-gfield.onChangeroup">
              <button type="button" data-testid="delete-button"   className="btn btn-outline-danger btn-sm button_delete"
                      onClick={()=>dispatch({type: "DELETE_KNOWTYPE", knowtype: props.knowtype})}>{t('action.delete-know-type')}</button>
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  )}

export default EditKnowtypeForm