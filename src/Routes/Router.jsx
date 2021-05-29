import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import LoginPage from '../Components/Login/LoginPage';
import UserProfilePage from "../Components/UserProfile/UserProfilePage";

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
                <Route path="/:user_name" exact>
                    <UserProfilePage />
                </Route>
            </Switch>
        </>
    )
}

export default Router
