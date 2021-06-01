import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyB5p8dkpbxvYX_6TirF0Tvr-Dfye1aikFQ",
    authDomain: "facebook-5d8d9.firebaseapp.com",
    projectId: "facebook-5d8d9",
    storageBucket: "facebook-5d8d9.appspot.com",
    messagingSenderId: "1005595138949",
    appId: "1:1005595138949:web:f6fe78aa93b00bf13202ec"
  };



  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.firestore();

  export {app,database}