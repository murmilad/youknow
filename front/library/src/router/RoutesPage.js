import React, { useEffect }  from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

//pages
import KnowTypesPage from "../forms/Workarea/KnowTypes/KnowTypes"
import LoginPage from "../forms/Login/Login"
import SignedUp from "../forms/Login/SignedUp"
import SignUp from "../forms/Login/SignUp"
import Verify from "../forms/Login/Verify"
import ResetPasswordPage from "../forms/Login/ResetPassword";
import ForgotPasswordPage from "../forms/Login/ForgotPassword";


function RoutesPage() {
    let dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const signed_up = useSelector(state => state.signed_up)
    const verified = useSelector(state => state.verified)


    return (
       <BrowserRouter>
            <Routes>
            <Route 
                exact
                path="/"
                element={
                    user ?
                        <KnowTypesPage />
                        : <Navigate to={{ pathname: '/login' }} />
                }
            >

                </Route>
                <Route
                    path="/login"
                    element={
                        user ?
                            <Navigate to={{ pathname: '/' }} />
                            : <LoginPage />
                    }
                    />
                <Route
                    path="/signup"
                    element={
                        signed_up ?
                            <SignedUp />
                            : <SignUp/>
                    }
                    />
                <Route
                    path="/resetpassword/:verifyHash"
                    element={<ResetPasswordPage/>}
                    />
                <Route
                    path="/forgot"
                    element={<ForgotPasswordPage/>}
                    />                
                <Route
                    path="/verifyemail/:verifyHash"
                    element={
                        verified ?
                            <Navigate to={{ pathname: '/' }} />
                            : <Verify/>
                    }
                    />
            </Routes>
        </BrowserRouter>
   );
}
 
export default  RoutesPage