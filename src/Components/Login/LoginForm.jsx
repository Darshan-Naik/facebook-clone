import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm({onClickCreate}){
    
    return (
        <div className="loginFormMainDiv">
            <input type="text" placeholder="Email address or phone number"/>
            <input type="password" placeholder="Password" />
            <button>Log In</button>
            <Link to="/">Forgotten password?</Link>
            <hr className="hrLoginForm" />
            <button onClick={onClickCreate}>Create New Account</button>
        </div>
    )
}

export default LoginForm;