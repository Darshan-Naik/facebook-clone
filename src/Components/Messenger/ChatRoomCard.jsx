import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { database } from '../../Firebase/firebase'
import NotificationBubble from '../../SharedComponents/NotificationBubble'
import StatusDot from "../../SharedComponents/StatusDot"
import checkActive from '../../Utils/checkActive'

function ChatRoomCard({chatID,authors}) {
    const uid = useSelector(store=>store.auth.user.uid)
    const [userDetails,setUserDetails] = React.useState({})
    const [messages,setMessages] = React.useState([])
    const [activeState,setActiveState]=React.useState(false);
    const history =useHistory()
    React.useEffect(()=>{
        const senderID = authors.filter(id=>id !==uid)
            const unsubscribe = database.collection("users").doc(senderID[0])
            .onSnapshot((doc) => {
                setUserDetails(doc.data());
            });
            return () => {
                unsubscribe();
            }
    },[uid,authors])
    React.useEffect(()=>{
          const unsubscribe =  database.collection("chatRooms").doc(chatID).collection("messages").orderBy("time","desc")
            .onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=>{       
            return {id:doc.id,...doc.data()}
            }))
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    React.useEffect(()=>{
        if(userDetails.activeStatus){
            if(checkActive(userDetails.activeStatus)==="Active Now"){
                setActiveState(true);
            }else{
                setActiveState(false);
            }

        }
        
    },[userDetails.activeStatus])
    const time = new Date(messages[0]?.time?.toDate()).toLocaleTimeString();
    return (
        <div className="chatRoomCardBox flexBox" onClick={()=>history.push(`/messenger/${chatID}`)}>
            <div className="chatRoomUserImage">
              {activeState &&  <StatusDot width="12px" height="12px" />}
              <NotificationBubble number={messages.filter(el=>el.author !== uid && !el.isRead).length}/>
                <img src={userDetails?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetails">
                <h2>{`${userDetails?.first_name} ${userDetails?.last_name}`}</h2>
                <small className="flexBox"><p className="messengerText">{messages[0]?.text}</p> <span>{time}</span></small>
            </div>
           
            {/* <div className="messageCount">
                {messages.filter(el=>el.author !== uid && !el.isRead).length}
            </div> */}
        </div>
    )
}

export default ChatRoomCard
