import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaveLoading } from "react-loadingg";

function LoginForm({onClickCreate,password,email,handleLogin,handleLoginForm,isLoading}){
    return (
        <div className="loginFormMainDiv">
            <input type="text" value={email}  name="email" onChange={handleLoginForm} placeholder="Email address or phone number"/>
            <input type="password" value={password} onChange={handleLoginForm} name="password" placeholder="Password" />
            <button disabled={isLoading} onClick={handleLogin}>{!isLoading?"Log In":<WaveLoading size="small" color="var(--primary-background)" style={{margin: "auto"}}/>}</button>
            <Link to="/">Forgotten password?</Link>
            <hr className="hrLoginForm" />
            <button onClick={onClickCreate}>Create New Account</button>
        </div>
    )
}

export default LoginForm;