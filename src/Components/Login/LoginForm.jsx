import React from 'react';

function LoginForm(){
    return (
        <div className="loginFormMainDiv">
            <input type="text" placeholder="Email address or phone number"/>
            <input type="password" placeholder="Password" />
            <button>Log In</button>
            <a href="#">Forgotten password?</a>
            <hr className="hrLoginForm" />
            <button>Create New Account</button>
        </div>
    )
}

export default LoginForm;