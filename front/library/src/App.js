import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import ErrorModal from "./components/Errors/ErrorModal"

//styles
import './App.css';
import CreateKnowtypeForm from "./components/KnowTypes/CreateKnowtypeForm";
const KnowTypes = lazy(() => import( "./components/KnowTypes/KnowTypes"));

function App() {
  const selections = useSelector(state => state.selections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "GET_KNOWTYPES"})
    dispatch({type: "GET_SELECTIONS"})
  }, [])

  return (
    <>
    <div className="wrapper _wrapper">
      <h2 className="page_title">KnowTypes</h2>
      <CreateKnowtypeForm />
      <Suspense fallback={<div>Loading...</div>}>
        <KnowTypes/>
      </Suspense>
    </div>
    <ErrorModal />
    </>
  );
}

export default App;