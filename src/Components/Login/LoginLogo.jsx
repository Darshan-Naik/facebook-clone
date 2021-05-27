import React from 'react';
import "../../App.css";
import "../../Styles/Login/LoginPage.css"

function LoginLogo(){
    return (
        <div className="leftLoginContainer">
            <img src={process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="" />
            <p>Facebook helps you connect and share with the people in your life.</p>
        </div>
    )
}

export default LoginLogo;