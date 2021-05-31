import React from 'react';
import "../../App.css";
import "../../Styles/Login/LoginPage.css"
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';

function LoginPage(){
    return (
        <div>
            <div className="loginPageContainer flexBox">
                <LoginLogo />
                <LoginForm />
            </div>
            <div className="LoginPageFooter">
                <p>English (UK)</p>
                <p>Facebook © 2021</p>
            </div>
        </div>


    )
}

export default LoginPage;