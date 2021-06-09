import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBmRNmqmTlt3PvUqYY3FUBA4w1qpMkqSS8",
    authDomain: "facebook-45269.firebaseapp.com",
    projectId: "facebook-45269",
    storageBucket: "facebook-45269.appspot.com",
    messagingSenderId: "761576697175",
    appId: "1:761576697175:web:11a1cc6fd22137a7b5e212"
};



  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.firestore();
  const storage = firebase.storage()

  export {app,database,storage}