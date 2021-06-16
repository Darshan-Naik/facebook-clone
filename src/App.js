import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { app, database } from "./Firebase/firebase";
import Router from "./Routes/Router";
import { clearPosts, getPosts } from './Redux/Posts/actions';
import { getChatRooms, getUsers, resetApp, updateActiveContacts } from "./Redux/App/actions";
import { getFavorites, getFriendRequest, getFriends, getNotifications, getSentRequest, loginSuccess, logoutSuccess } from "./Redux/Auth/actions";

function App() {
  const [state,setState] = React.useState(null)
  const uid = useSelector( state => state.auth.user.uid );
  const isAuth = useSelector( state => state.auth.isAuth );
  const friends = useSelector(store=>store.auth.friends)
 
  const dispatch = useDispatch()
  const root = document.querySelector(':root');
  const dark = useSelector(store=>store.theme.dark)

  React.useEffect(()=>{
      app.auth().onAuthStateChanged(user=>{
        if(!user){
          dispatch(clearPosts())
          dispatch(resetApp())
          dispatch(logoutSuccess())
        }
      })
  },[])

  React.useEffect(()=>{
    
   
    if(uid && isAuth){
      /* => getting all users from database 
         => dispatching users to the redux store */
      database.collection("users").get().then(res=>{
        const newUsers = res.docs.map(doc=>doc.data())
        dispatch(getUsers(newUsers))     
      });

    const unsubscribe1 = database.collection("posts").orderBy("time","desc").limit(5).onSnapshot(res=>{
        const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
        setState(res.docs[ res.docs.length-1])
        dispatch(getPosts(newPosts))
    });
    const unsubscribe3 = database.collection("users").doc(uid).collection('friendRequests').onSnapshot(res=>{
      const newFriendRequest = res.docs.map(doc=>doc.data())
      dispatch( getFriendRequest( newFriendRequest ) );
    });

    const unsubscribe4 = database.collection("users").doc(uid).collection('friends').onSnapshot(res=>{
      const newFriends = res.docs.map(doc=>({docId:doc.id,...doc.data()}))
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
    const unsubscribe9 = database.collection("users").doc(uid).collection("favorites").orderBy("time","desc").onSnapshot(res=>{
      const newFavorite = res.docs.map(doc=>(doc.data()))
     dispatch(getFavorites(newFavorite))
    });

    return () => {
      unsubscribe1();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
      unsubscribe6();
      unsubscribe7();
      unsubscribe8();
      unsubscribe9();
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


 const getNextPost = ()=>{
    if(state) {
      database.collection("posts").orderBy("time","desc").startAfter(state).limit(5).get().then(res=>{
      setState(res.docs[ res.docs.length-1])
      dispatch(getPosts(res.docs.map(doc=>({id:doc.id,...doc.data()}))))
      });
  }
}

  return (
    <div className="App">
        <Router getNextPost={getNextPost}/>
    </div>
  );
}

export default App;
