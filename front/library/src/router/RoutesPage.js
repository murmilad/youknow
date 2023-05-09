import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

//pages
import KnowTypesPage from "../forms/KnowTypes/KnowTypes"
import LoginPage from "../forms/Login/Login"


function RoutesPage() {
    const logged_in = useSelector(state => state.logged_in)


    return (
       <BrowserRouter>
            <Routes>
            <Route 
                exact
                path="/"
                element={
                    logged_in ?
                        <KnowTypesPage />
                        :
                        <Navigate to={{ pathname: '/login' }} />
                }
            >

                </Route>
                <Route
                    path="/login"
                    element={
                        logged_in ?
                            <Navigate to={{ pathname: '/' }} />
                        :
                            <LoginPage />
                    }
                    />
            </Routes>
        </BrowserRouter>
   );
}
 
export default  RoutesPage