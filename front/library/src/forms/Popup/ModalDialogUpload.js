import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form } from "formik"
import * as yup from "yup"

function ModalDialogUpload() {
  const { t, i18n } = useTranslation();
  const dialog = useSelector(state => state.modal.dialog_upload)
  const dispatch = useDispatch()
  return (
    <>
      {dialog?.isShow && <div className="modal_overlay" />}
      <Modal show={dialog?.isShow} onHide={() => dispatch({ type: "HIDE_UPLOAD_DIALOG_MODAL" })}>
        <Formik
          enableReinitialize
          initialValues={{
            file: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch({...dialog?.callback,  payload: {file: values.file}});
            resetForm();
          }}
          validationSchema={
            yup.object().shape({
              file: yup.string().required(),
            })
          }
        >{({ touched, errors, handleSubmit }) => (
          <>
            <Modal.Header closeButton>
              <Modal.Title >{dialog?.header}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form >
                <Field
                  name="file"
                >{({ field, form }) => (
                  <BootstrapForm.Group controlId="formFile" className="mb-3">
                    <BootstrapForm.Label>{dialog?.message}</BootstrapForm.Label>
                    <BootstrapForm.Control type="file" {...field} />
                  </BootstrapForm.Group>
                )}
                </Field>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={() => {
                dispatch({ type: "HIDE_UPLOAD_DIALOG_MODAL" });
              }} variant="secondary">{t('action.close-dialog')}</Button>
              <Button onClick={() => {
                handleSubmit();
              }} variant="primary">{dialog?.header}</Button>
            </Modal.Footer>
          </>
        )}
        </Formik>
      </Modal >
    </>
  )
}

export default ModalDialogUpload