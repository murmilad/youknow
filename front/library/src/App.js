import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//forms
import ModalInfo from './forms/Popup/ModalInfo';
import ModalError from "./forms/Popup/ModalError"
import ModalDialog from './forms/Popup/ModalDialog';
import ModalDialogUpload from './forms/Popup/ModalDialogUpload';
import RoutesPage from "./router/RoutesPage"

//styles
import './App.scss';
import { useTranslation } from 'react-i18next';




function App() {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'CHECK_LOG_IN' })
  });


  return (
    <>
      <RoutesPage />
      <ModalInfo />
      <ModalError />
      <ModalDialog />
      <ModalDialogUpload />
    </>
  );
}

export default App;