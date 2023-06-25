import { useState, useEffect, useRef } from "react";
import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form } from "formik"
import * as yup from "yup"
import { getBase64 } from "../../utils/utils";
import { useFormik } from 'formik';

function ModalDialogUpload() {
  const { t, i18n } = useTranslation();
  const dialog = useSelector(state => state.modal.dialog_upload)
  const dispatch = useDispatch()
  const [file, setFile] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      file: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch({ ...dialog?.callback, payload: { file: values.file } });
      resetForm();
    },
    validationSchema: yup.object({
      file: yup.string().required(),
    })

  });

  useEffect(function () {
    formik.setFieldValue('file', file)
  }, [file]);

  return (
    <>
      {dialog?.isShow && <div className="modal_overlay" />}
      <Modal show={dialog?.isShow} onHide={() => dispatch({ type: "HIDE_UPLOAD_DIALOG_MODAL" })}>
        <form >
          <Modal.Header closeButton>
            <Modal.Title >{dialog?.header}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <BootstrapForm.Group controlId="formFile" className="mb-3">
              <BootstrapForm.Label>{dialog?.message}</BootstrapForm.Label>
              <BootstrapForm.Control type="file" onChange={(e) => {
                getBase64(e.currentTarget.files[0], (result) => {
                  setFile(result);
                });
              }} />
            </BootstrapForm.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => {
              dispatch({ type: "HIDE_UPLOAD_DIALOG_MODAL" });
            }} variant="secondary">{t('action.close-dialog')}</Button>
            <Button disabled={!file} onClick={() => {
              formik.handleSubmit();
            }} variant="primary">{dialog?.header}</Button>
          </Modal.Footer>
        </form>
      </Modal >
    </>
  )
}

export default ModalDialogUpload