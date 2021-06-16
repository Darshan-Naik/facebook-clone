import React from 'react'
import { Link } from 'react-router-dom';
import { WaveLoading } from "react-loadingg";
import { resetPassword } from '../../Firebase/authentication';
import PopUp from '../../SharedComponents/PopUp';
function ResetPassword({onClickCreate,toggleReset}) {
    const [resetLoading,setResetLoading] = React.useState(false)
    const [error,setError] = React.useState("")
    const [resetState,setResetState]  =React.useState({email: "", confirmEmail : ""})

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setResetState({...resetState, [name] : value})
    }
    const handleResetPassword = () => {
        setResetLoading(true)
        if(resetState.email === resetState.confirmEmail){
            resetPassword(resetState.email).then(()=>{
                setError("Check your email to reset password.")
                setResetLoading(false)
               })
               .catch((err)=>{
                setError(err.message)
                setResetLoading(false)
               })
        } else {
            setError("Email did not match!")
            setResetLoading(false)
        }
       
    }
    return (

             <div className="loginFormMainDiv">
            <input type="email" value={resetState.email}  name="email" onChange={handleChange} placeholder="Email address"/>
            <input type="email" value={resetState.confirmEmail} onChange={handleChange} name="confirmEmail" placeholder="Confirm email address" />
            {error && <div className="errorMessageContainer">
                    <p style={{color : error === "Check your email to reset password."?"var(--secondary-4)" : "var(--supplementary-1)"}}>{error}</p>
                </div>
            }
            <button disabled={resetLoading} onClick={handleResetPassword}>{!resetLoading?"Reset password":<WaveLoading size="small" color="var(--primary-background)" style={{margin: "auto"}}/>}</button>
            <Link to="/" onClick={()=>toggleReset(false)}>Login</Link>
            <hr className="hrLoginForm" />
            <button onClick={onClickCreate}>Create New Account</button>
        </div>
    )
}

export default ResetPassword
