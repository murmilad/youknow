import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

function ModalError() {
  const { t, i18n } = useTranslation();
  const errorModal = useSelector(state => state.modal.error)
  const dispatch = useDispatch()
  return (
    <>
      { errorModal?.isShow && <div className="modal_overlay" /> }
      <Modal show={errorModal?.isShow} onHide={() => dispatch({ type: "HIDE_ERROR_MODAL" })}>
        <Modal.Header closeButton>
          <Modal.Title role="error-message" >{t('header.error')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{errorModal?.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => { dispatch({ type: "HIDE_ERROR_MODAL" }) }} variant="secondary">{t('action.close-error')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalError