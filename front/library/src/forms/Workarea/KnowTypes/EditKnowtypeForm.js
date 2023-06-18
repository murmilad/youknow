import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';
import PickerField from '../../../components/PickerField'
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { TwitterPicker } from 'react-color';

function EditKnowtypeForm(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isStyling, setIsStyling] = useState(false);
  const picker = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (picker.current && !picker.current.contains(event.target)) {
        setIsStyling(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [picker]);

  return (
    <Formik
      initialValues={{
        id: props.knowtype.id,
        name: props.knowtype.name,
        style: props.knowtype.style,
      }}
      enableReinitialize
      onSubmit={(values) => {
        dispatch({
          type: 'EDIT_KNOWTYPE', knowtype: {
            id: values.id,
            name: values.name,
            style: values.style
          }
        });
        setIsEditing(false);
        setIsStyling(false);
      }}
      validationSchema={
        yup.object().shape({
          name: yup.string().required(),
          style: yup.string().required(),
        })
      }
    >
      <Form className="edit_form row" >

        <div className="edit_form_wrapper form-wrapper" >
          {isEditing ?
            <Field name="name" >
              {({
                field,
                form,
                meta,
              }) => {
                field.onBlur = () => {
                  form.submitForm();
                };
                return (
                  <div className="line_element form-group" >
                    <input
                      autoFocus
                      placeholder={t('field.know-type-name')}
                      className={(meta.error) ? 'form-control is-invalid' : 'form-control'}
                      {...field}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )
              }}
            </Field>
            :
            <Nav.Link onClick={() => setIsEditing(true)}>{t('action.edit-know-type')}</Nav.Link>
          }
          <Field name="style">
            {({
              field,
              form,
              meta,
            }) => (
              <Nav.Link onClick={() => setIsStyling(true)}>{t('action.edit-style-know-type')}
                {isStyling &&
                  <div ref={picker} className="picker_popover" >
                    <TwitterPicker
                      colors={['#F3F8FF', '#DEECFF', '#C6CFFF', '#E8D3FF', '#CDF0EA', '#F9F9F9', '#F6C6EA', '#FFF6BD', '#CEEDC7', '#B2C8DF']}
                      onChange={(color) => {
                        form.setFieldValue("style", color.hex);
                        setIsStyling(false);
                        form.submitForm();
                      }} />
                  </div>
                }
              </Nav.Link>
            )}
          </Field>

          <Nav.Link onClick={() => dispatch({ type: "DELETE_KNOWTYPE", knowtype: props.knowtype })} variant="btn btn-outline-light">{t('action.delete-know-type')}</Nav.Link>
        </div>
      </Form>
    </Formik>
  )
}

export default EditKnowtypeForm