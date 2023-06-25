import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

function ModalDialog() {
  const { t, i18n } = useTranslation();
  const dialog = useSelector(state => state.modal.dialog)
  const dispatch = useDispatch()
  return (
    <>
      {dialog?.isShow && <div className="modal_overlay" />}
      <Modal show={dialog?.isShow} onHide={() => dispatch({ type: "HIDE_DIALOG_MODAL" })}>
        <Modal.Header closeButton>
          <Modal.Title >{dialog?.header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{dialog?.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => { 
            dispatch({ type: "HIDE_DIALOG_MODAL" }); 
          }} variant="secondary">{t('action.close-dialog')}</Button>
          <Button onClick={() => {
            dispatch(dialog?.callback);
            dispatch({ type: "HIDE_DIALOG_MODAL" });
          }} variant="primary">{dialog?.header}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDialog