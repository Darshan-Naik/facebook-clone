import { app } from "./firebase";

const login=(email, password)=>{
   return app.auth().signInWithEmailAndPassword(email, password)
}

const signup = (email, password)=>{
   return app.auth().createUserWithEmailAndPassword(email, password)
}

export {login,signup}

 