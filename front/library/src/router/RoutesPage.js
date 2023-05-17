import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

//pages
import KnowTypesPage from "../forms/KnowTypes/KnowTypes"
import LoginPage from "../forms/Login/Login"
import SignedUp from "../forms/Login/SignedUp"
import SignUp from "../forms/Login/SignUp"
import Verify from "../forms/Login/Verify"


function RoutesPage() {
    const logged_in = useSelector(state => state.logged_in)
    const signed_up = useSelector(state => state.signed_up)
    const verified = useSelector(state => state.verified)

    return (
       <BrowserRouter>
            <Routes>
            <Route 
                exact
                path="/"
                element={
                    logged_in ?
                        <KnowTypesPage />
                        : <Navigate to={{ pathname: '/login' }} />
                }
            >

                </Route>
                <Route
                    path="/login"
                    element={
                        logged_in ?
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