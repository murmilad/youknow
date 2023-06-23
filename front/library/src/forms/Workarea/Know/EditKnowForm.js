import {useSelector, useDispatch} from "react-redux";
import {Formik, Field, Form} from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';


function EditKnowForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const error = useSelector(state => state.know.error)
  const close = useSelector(state => state.know.close)
  const open = useSelector(state => state.know.open)


  var handleClick = () => {
    if (!error){
      if (props.know.id == open) {
        dispatch({type: 'OPEN_KNOW', payload:{id:null}})
      } else
        dispatch({type: 'OPEN_KNOW', payload:{id:props.know.id}})
    }
  }
/*   <input 
  autoFocus 
  placeholder={t('field.know-name')} 
  className={(meta.error) ? 'form-control is-invalid' : 'form-control'} 
  {...field}
  onClick={(e)=>e.stopPropagation()} 
  onBlur={(e) => {
      form.submitForm()
      if (!form.isValid)
        dispatch({type: 'CLOSE_KNOWS', payload:{close:false}})
      dispatch({type: 'ERROR_KNOW', payload:{error:!form.isValid}})
  }}/>
 */
  return (
    <div onClick={handleClick} key={props.idx}  className="list-group-item d-flex justify-content-between align-items-center">

    <Formik
      initialValues = {{
        id: props.know.id,
        name: props.know.name,
        value: props.know.value,
        knowtype_id: props.knowtypeId
      }}
      enableReinitialize
      onSubmit ={ (values)=> {
        dispatch({type: 'EDIT_KNOW', know: {
          id: values.id,
          name: values.name,
          value: values.value,
          knowtype_id: props.knowtypeId
        }})
        if (close) {
          dispatch({type: 'OPEN_KNOW', payload:{id:null}})
          dispatch({type: 'CLOSE_KNOWS', payload:{close:false}})
        }
      }}
      validationSchema = {
        yup.object().shape({
          name: yup.string().required(),
          value: yup.string().required(),
        })
      }
    >
      <Form className="edit_form row" >
        
        <div className="edit_form_wrapper form-wrapper" >
          { !props.open 
            && <>
              <div className="line_element"><strong>{props.know.name}</strong></div>
              </>
            || <> 
              <Field name="name" > 
                {({
                  field,
                  form,
                  meta,
                }) => (
                  <div className="line_element form-group" >
                    <Form.Control 
                      autoFocus
                      placeholder={t('field.know-name')}
                      as="textarea"
                      rows={3}
                      className={(meta.error) ? 'form-control is-invalid' : 'form-control'}
                      {...field}/>
                  </div>
                )}
              </Field>
              <Field name="value" > 
                {({
                  field,
                  form,
                  meta,
                }) => (
                  <div className="line_element form-group" >
                    <input 
                      autoFocus 
                      placeholder={t('field.know-value')} 
                      className={(meta.error) ? 'form-control is-invalid' : 'form-control'} 
                      {...field}
                      onClick={(e)=>e.stopPropagation()} 
                      onBlur={(e) => {
                          form.submitForm()
                          if (!form.isValid)
                            dispatch({type: 'CLOSE_KNOWS', payload:{close:false}})
                          dispatch({type: 'ERROR_KNOW', payload:{error:!form.isValid}})
                      }}/>
                  </div>
                )}
              </Field>
           </>
          }
          <button style={{display:'none'}} type="submit"/>

          <div className="line_element form-gfield.onChangeroup">
              <button type="button" data-testid="delete-button"   className="btn btn-outline-danger btn-sm button_delete"
                      onClick={()=>dispatch({type: "DELETE_KNOW", know: props.know})}>{t('action.delete-know')}</button>
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  )}

export default EditKnowForm