import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//forms
import ErrorModal from "./forms/Errors/ErrorModal"

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
    <div className="wrapper _wrapper">
      <h2 className="page_title">{t('header.know-types')}</h2>
      <Suspense fallback={<div>{t('message.loading')}</div>}>
        <KnowTypes/>
      </Suspense>
      <CreateKnowtypeForm />
    </div>
    <ErrorModal />
    </>
  );
}

export default App;