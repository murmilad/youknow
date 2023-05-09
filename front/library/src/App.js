import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//forms
import ErrorModal from "./forms/Errors/ErrorModal"
import RoutesPage from "./router/RoutesPage"

//styles
import './App.css';
import { useTranslation } from 'react-i18next';


import CreateKnowtypeForm from "./forms/KnowTypes/CreateKnowtypeForm";
const KnowTypes = lazy(() => import( "./forms/KnowTypes/KnowTypes"));


function App() {
  const { t, i18n } = useTranslation();

  const selections = useSelector(state => state.selections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "GET_KNOWTYPES"})
    dispatch({type: "GET_SELECTIONS"})
  }, [])

  return (
    <>
      <Suspense fallback={<div>{t('message.loading')}</div>}>
        <RoutesPage/>
      </Suspense>
    <ErrorModal />
    </>
  );
}

export default App;