import React, { useEffect, useState } from 'react';
import "../../App.css";
import "../../Styles/Login/LoginPage.css"
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import { login, signup } from '../../Firebase/authentication';
import { database } from '../../Firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess, signUpFailure, signupRequest, signupSuccess } from '../../Redux/Auth/actions';

const initFormSignup = {
    first_name :"",
    last_name : "",
    email : "",
    password : "",
    gender: ""
}
const initFormLogin = {
    email : "",
    password : ""
}
function LoginPage(){
    const [isCreateClick, setIsCreateClick] = useState(false);
    const [signUpForm,setSignUpForm] = React.useState(initFormSignup)
    const [logInForm,setLogInForm] = React.useState(initFormLogin)
    const {first_name , last_name,email, password, gender} = signUpForm;
    const [dob, setDob] = useState("1, June, 1950");
    const [day, setDay] = useState("1");
    const [mon, setMon] = useState("June");
    const [year, setYear] = useState("1950");
    const {errorMessage, isError} = useSelector(store=>store.auth)
    const handleSignUpForm = (e)=>{
        //console.log(e.target.value)
        const {value,name} = e.target;
        setSignUpForm({...signUpForm,[name]:value}) 
        //console.log(signUpForm)
    }

    const handleLoginForm = (e)=>{
        const {value,name} = e.target;
        setLogInForm({...logInForm,[name]:value}) 
    }

    const handleChangeDob = (e) => {
        if(e.target.name == "date_of_birth:day"){
            setDay(e.target.value);
        } else if (e.target.name == "date_of_birth:mon"){
            setMon(e.target.value);
        } else if (e.target.name == "date_of_birth:year"){
            setYear(e.target.value);
        }
        
        //console.log(dob)
    }

    useEffect(()=>{
        setDob(day+", "+mon+", "+year);
        console.log(dob)
    },[day, mon, year])

    const dispatch =useDispatch()

    
    const handleSingUp = ()=>{
        dispatch(signupRequest())
        signup(email,password)
        .then(res=>{
           const {uid} = res.user
           const payload = {uid,...signUpForm,dob}
           database.collection("users").add(payload).then(()=>{
                dispatch(signupSuccess(payload))
           })
        }).catch((err)=>{
            dispatch(signUpFailure(err.message))
        })

    }



    const handleLogin =()=>{
        dispatch(loginRequest())
        login(logInForm.email,logInForm.password)
        .then(res=>{
            const {uid} = res.user
            database.collection("users").where("uid","==",uid).get().then(res=>{
                res.docs.map(doc=>dispatch(loginSuccess(doc.data()) ))})
        })
        .catch((err)=>{
            console.log("p",err);
            dispatch(loginFailure(err))
        })
    }

    const handleCreateClick = () => {
        console.log("u")
        setIsCreateClick(true);
    }
    const handleCloseClick = () => {
        console.log("c")
        setIsCreateClick(false);
    }

    const years = new Array(60).fill(1950);
    const days = new Array(31).fill(1);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return  (<>
        <div>
            <div className="loginPageContainer flexBox">
                <LoginLogo />
                <LoginForm {...logInForm}  handleLoginForm={handleLoginForm} handleLogin={handleLogin} onClickCreate={handleCreateClick} />
            </div>
            <div className="LoginPageFooter">
                <p>English (UK)</p>
                <p>Facebook © 2021</p>
            </div>
        </div>

     { isCreateClick && ( <div className="signUpModel">
        <div className="signUpContainer">
            <h2 className="signUpH2">Sign Up</h2>
            <p className="signUpP">It's quick and easy.</p>
            <hr className="signUpHr"/>
            {/* <br /> */}
            <button className="signUpbuttonClose" onClick={handleCloseClick}><CloseIcon /></button>
            {isError && <div className="errorHandlingContainerSignUp">
                <p>{errorMessage}</p>
            </div>
            }
            <div className="nameSignUpContainer" >
                <input type="text" placeholder="First name" value={first_name} name="first_name"  onChange={handleSignUpForm} />
                <input type="text" placeholder="Surname" value={last_name}  name="last_name" onChange={handleSignUpForm}/>
            </div>
            <input className="numPassInput" type="email" value={email}  placeholder="Email address" name="email" onChange={handleSignUpForm} />
            <input className="numPassInput" type="password" value={password}  placeholder="New password" name="password" onChange={handleSignUpForm} />
            <div className="dobSignUpContainer">
                <p>Date of birth</p>
                <select onChange={(e)=>handleChangeDob(e)} class="first" name="date_of_birth:day" tabindex="7">
                    {days.map((el,i)=>(
                        <option key={el+i} value={el+i}>{el+i}</option>
                    ))}
                </select>
                <select onChange={(e)=>handleChangeDob(e)} name="date_of_birth:mon" tabindex="8">
                    {months.map((el)=>(
                        <option key={el} value={el}>{el}</option>
                    ))}
                </select>
                <select onChange={(e)=>handleChangeDob(e)} name="date_of_birth:year" tabindex="9">
                    {years.map((el,i)=>(
                        <option key={el+i} value={el+i}>{el+i}</option>
                    ))}
                </select>
            </div>
            <p className="genderPtag">Gender</p>
            <div className="dobSignUpContainer flexBox">
                
                <div>
                    <input type="radio" onChange={(e)=>handleSignUpForm(e)} value="MALE" name="gender"/> 
                    <p>Male</p>
                </div>
                <div>
                    <input type="radio" onChange={(e)=>handleSignUpForm(e)} value="FEMALE" name="gender"/>
                    <p>Female</p>
                </div>
                <div>
                    <input type="radio" onChange={(e)=>handleSignUpForm(e)} value="OTHERS" name="gender"/>
                    <p>Others</p>
                </div>
            </div>
            <p className="termsSignUpContainer">By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. </p>
            <button className="signUpButton" onClick={handleSingUp}>Sign-up</button>
        </div>       
    </div>)}
    </>

    )
}

export default LoginPage;