import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

function ModalInfo() {
  const { t, i18n } = useTranslation();
  const infoModal = useSelector(state => state.modal.info)
  const dispatch = useDispatch()
  return (
    <>
      { infoModal?.isShow && <div className="modal_overlay" /> }
      <Modal show={infoModal?.isShow} onHide={() => dispatch({ type: "HIDE_INFO_MODAL" })}>
        <Modal.Header closeButton>
          <Modal.Title >{t('header.info')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{infoModal?.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => { dispatch({ type: "HIDE_INFO_MODAL" }) }} variant="secondary">{t('action.close-info')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalInfo