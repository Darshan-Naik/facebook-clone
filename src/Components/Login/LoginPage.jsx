import React from 'react';
import "../../App.css";
import "../../Styles/Login/LoginPage.css"
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';

function LoginPage(){
    return (
        <div className="loginPageContainer flexBox">
            <LoginLogo />
            <LoginForm />
        </div>


    )
}

export default LoginPage;