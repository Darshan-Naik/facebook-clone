import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { database } from "./Firebase/firebase";
import Router from "./Routes/Router";
import { getPosts } from './Redux/Posts/actions';
import { getUsers } from "./Redux/App/actions";
import { getFriendRequest, getFriends, getSentRequest } from "./Redux/Auth/actions";

function App() {

  const { uid } = useSelector(state => state.auth.user);

  const dispatch = useDispatch()
  const root = document.querySelector(':root');
  const dark = useSelector(store=>store.theme.dark)

  React.useEffect(()=>{
    
    database.collection("posts").orderBy("time","desc").onSnapshot(res=>{
        const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
        dispatch(getPosts(newPosts))
    });

    database.collection("users").onSnapshot(res=>{
      const newUsers = res.docs.map(doc=>doc.data())
      dispatch(getUsers(newUsers))
    });

    database.collection("users").doc(uid).collection('friendRequests').onSnapshot(res=>{
      const newFriendRequet = res.docs.map(doc=>doc.data())
      dispatch( getFriendRequest( newFriendRequet ) );
    });

    database.collection("users").doc(uid).collection('friends').onSnapshot(res=>{
      const newFriends = res.docs.map(doc=>doc.data())
      dispatch( getFriends( newFriends ) );
    });

    database.collection("users").doc(uid).collection('sentRequests').onSnapshot(res=>{
      const sentFriendRequest = res.docs.map(doc=>doc.data())
      dispatch( getSentRequest( sentFriendRequest ) );
    });

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
