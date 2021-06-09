import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { database } from "./Firebase/firebase";
import Router from "./Routes/Router";
import { getPosts } from './Redux/Posts/actions';
import { getChatRooms, getUsers, updateActiveContacts } from "./Redux/App/actions";
import { getFriendRequest, getFriends, getNotifications, getSentRequest, loginSuccess } from "./Redux/Auth/actions";

function App() {

  const {uid,activeStatus} = useSelector( state => state.auth.user );
  const isAuth = useSelector( state => state.auth.isAuth );
  const friends = useSelector(store=>store.auth.friends)
 
  const dispatch = useDispatch()
  const root = document.querySelector(':root');
  const dark = useSelector(store=>store.theme.dark)

  const handleActiveStatus = (e)=>{
    e.stopPropagation(); 
    if((new Date() - activeStatus)>1559367580871){
      // console.log(new Date() - activeStatus)
   // database.collection("users").doc(uid).update({activeStatus : new Date()})
    }  
  }

  window.addEventListener("click",handleActiveStatus)

  React.useEffect(()=>{
    if(uid && isAuth){
    const unsubscribe1 = database.collection("posts").orderBy("time","desc").onSnapshot(res=>{
        const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
        dispatch(getPosts(newPosts))
    });

    const unsubscribe2 = database.collection("users").onSnapshot(res=>{
      const newUsers = res.docs.map(doc=>doc.data())
      dispatch(getUsers(newUsers))
    });

    const unsubscribe3 = database.collection("users").doc(uid).collection('friendRequests').onSnapshot(res=>{
      const newFriendRequest = res.docs.map(doc=>doc.data())
      dispatch( getFriendRequest( newFriendRequest ) );
    });

    const unsubscribe4 = database.collection("users").doc(uid).collection('friends').onSnapshot(res=>{
      const newFriends = res.docs.map(doc=>doc.data())
      dispatch( getFriends( newFriends ) );
    });

    const unsubscribe5 = database.collection("users").doc(uid).collection('sentRequests').onSnapshot(res=>{
      const sentFriendRequest = res.docs.map(doc=>doc.data())
      dispatch( getSentRequest( sentFriendRequest ) );
    });

    const unsubscribe6 = database.collection("chatRooms").where("authors", "array-contains",uid ).onSnapshot(res=>{
      const newChatRooms = res.docs.map(doc=>({chatID:doc.id,...doc.data()}))
      dispatch(getChatRooms(newChatRooms))
    });
    const unsubscribe7 =   database.collection("users").doc(uid)
    .onSnapshot((doc) => {
       dispatch(loginSuccess(doc.data()));
        
    });
    const unsubscribe8 = database.collection("users").doc(uid).collection("notifications").orderBy("time","desc").onSnapshot(res=>{
      const newNotifications = res.docs.map(doc=>({notificationID:doc.id,...doc.data()}))
     dispatch(getNotifications(newNotifications))
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
      unsubscribe6();
      unsubscribe7();
      unsubscribe8();
    }
  }
  
  },[isAuth,uid,dispatch])

  React.useEffect(()=>{
    if(isAuth){
      dispatch(updateActiveContacts(friends))
    }
      
  },[friends,dispatch,isAuth])

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
