import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import TextArea from "react-textarea-autosize";
import { XCircle } from "react-bootstrap-icons";

function EditKnowForm(props) {
  const { t, i18n } = useTranslation();
  const know = useSelector((state) => state.know.hash[props.id]);

  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingValue, setIsEditingValue] = useState(false);

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <Formik
        initialValues={{
          id: know.id,
          name: know.name,
          value: know.value,
          knowtype_id: props.knowtypeId,
        }}
        enableReinitialize
        onSubmit={(values) => {
          dispatch({
            type: "EDIT_KNOW",
            know: {
              id: values.id,
              name: values.name,
              value: values.value,
              knowtype_id: props.knowtypeId,
            },
          });
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required(),
          value: yup.string().required(),
        })}
      >
        {({ touched, errors, handleSubmit, isSubmitting, isValidating }) => (
          <Form
            className="edit_form row "
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                setIsEditingName(false);
                setIsEditingValue(false);
                handleSubmit();
              }
            }}
          >
            <div className="d-flex p-0">
              {(!isEditingName && (
                <div
                  className="w-50 m-2 float-left text-break"
                  onClick={() => {
                    setIsEditingName(true);
                  }}
                >
                  <strong className="css-fix text-break">{know.name}</strong>
                </div>
              )) || (
                <div className="w-50 m-2 float-left">
                  <Field name="name">
                    {({ field, form }) => {
                      field.onBlur = () => {
                        form.submitForm();
                        if (!errors.name) {
                          setIsEditingName(false);
                        }
                      };
                      return (
                        <TextArea
                          onKeyDown={(e) => {
                            if (e.key === "Tab") {
                              e.preventDefault();
                              form.submitForm();
                              if (!errors.name) {
                                setIsEditingName(false);
                                setIsEditingValue(true);
                              }
                            }
                          }}
                          autoFocus
                          placeholder={t("field.know-name")}
                          className={
                            touched.name && errors.name
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          {...field}
                        />
                      );
                    }}
                  </Field>
                  {touched.name && errors.name && (
                    <div className="invalid-feedback">
                      {t("error.required")}
                    </div>
                  )}
                </div>
              )}
              {(!isEditingValue && (
                <div
                  className="w-50 m-2 float-left text-break"
                  onClick={() => {
                    setIsEditingValue(true);
                  }}
                >
                  <strong className="css-fix text-break">{know.value}</strong>
                </div>
              )) || (
                <div className="w-50 m-2 float-left">
                  <Field name="value">
                    {({ field, form }) => {
                      field.onBlur = () => {
                        form.submitForm();
                        if (!errors.value) {
                          setIsEditingValue(false);
                        }
                      };
                      return (
                        <TextArea
                          onKeyDown={(e) => {
                            if (e.shiftKey && e.key === "Tab") {
                              e.preventDefault();
                              form.submitForm();
                              if (!errors.value) {
                                setIsEditingValue(false);
                                setIsEditingName(true);
                              }
                            }
                          }}
                          autoFocus
                          placeholder={t("field.know-value")}
                          className={
                            touched.value && errors.value
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          {...field}
                        />
                      );
                    }}
                  </Field>
                  {touched.value && errors.value && (
                    <div className="invalid-feedback">
                      {t("error.required")}
                    </div>
                  )}
                </div>
              )}
              <div className="m-2 float-left">
                <div
                  className="icon-warning btn-outline-danger "
                  tabIndex="-1"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "DELETE_KNOW", know: know });
                  }}
                  placeholder={t("action.delete-know")}
                >
                  <XCircle className="m-0" />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditKnowForm;
