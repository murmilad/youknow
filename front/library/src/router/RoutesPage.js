import React, { useEffect } from "react";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//pages
import WorkareaWrapper from "../forms/Workarea/WorkareaWrapper";
import Know from "../forms/Workarea/Know/Know";
import LoginPage from "../forms/Login/Login";
import SignedUp from "../forms/Login/SignedUp";
import SignUp from "../forms/Login/SignUp";
import Verify from "../forms/Login/Verify";
import ResetPasswordPage from "../forms/Login/ResetPassword";
import ForgotPasswordPage from "../forms/Login/ForgotPassword";
import NotFound from "../forms/Login/NotFound";

function RoutesPage() {
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const signed_up = useSelector((state) => state.signed_up);
  const verified = useSelector((state) => state.verified);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Know /> : <Navigate to={{ pathname: "/login" }} />}
        />
        <Route
          exact
          path="know/:id"
          element={user ? <Know /> : <Navigate to={{ pathname: "/login" }} />}
        />

        <Route
          path="login"
          element={user ? <Navigate to={{ pathname: "/" }} /> : <LoginPage />}
        />
        <Route path="signup" element={signed_up ? <SignedUp /> : <SignUp />} />
        <Route
          path="resetpassword/:verifyHash"
          element={<ResetPasswordPage />}
        />
        <Route path="forgot" element={<ForgotPasswordPage />} />
        <Route
          path="verifyemail/:verifyHash"
          element={verified ? <Navigate to={{ pathname: "/" }} /> : <Verify />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesPage;
