import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import LoginPage from '../Components/Login/LoginPage';

function Router() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact>
                   <Home />
                </Route>
                <Route path="/login" exact>
                   <LoginPage />
                </Route>
            </Switch>
        </>
    )
}

export default Router
