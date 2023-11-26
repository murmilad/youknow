import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

//forms
import ModalInfo from "./forms/Popup/ModalInfo";
import ModalError from "./forms/Popup/ModalError";
import ModalDialog from "./forms/Popup/ModalDialog";
import ModalDialogUpload from "./forms/Popup/ModalDialogUpload";
import RoutesPage from "./router/RoutesPage";

//styles
import "./App.scss";
import { useTranslation } from "react-i18next";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CHECK_LOG_IN" });
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RoutesPage />
      <ModalInfo />
      <ModalError />
      <ModalDialog />
      <ModalDialogUpload />
    </ErrorBoundary>
  );
}

export default App;
