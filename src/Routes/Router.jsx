import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";

function Router() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact>
                   <Home />
                </Route>
            </Switch>
        </>
    )
}

export default Router
