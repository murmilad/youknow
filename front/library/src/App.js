import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//forms
import ErrorModal from "./forms/Errors/ErrorModal"
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
      <ErrorModal />
    </>
  );
}

export default App;