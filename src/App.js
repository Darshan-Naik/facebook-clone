import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { database } from "./Firebase/firebase";
import Router from "./Routes/Router";
import { getPosts } from './Redux/Posts/actions';

function App() {

  const dispatch = useDispatch()
  const root = document.querySelector(':root');
  const dark = useSelector(store=>store.theme.dark)

  React.useEffect(()=>{
    database.collection("posts").orderBy("time","desc").onSnapshot(res=>{
        const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
        dispatch(getPosts(newPosts))
    })
},[])

  React.useEffect(()=>{
    if(dark){
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  },[dark,root])
  
 
  
  return (
    <div className="App">
        <Router/>
    </div>
  );
}

export default App;
