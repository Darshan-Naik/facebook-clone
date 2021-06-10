import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { database } from '../../Firebase/firebase'
import StatusDot from "../../SharedComponents/StatusDot"

function ChatRoomCard({chatID,authors,message ="Text",time="while ago"}) {
    const uid = useSelector(store=>store.auth.user.uid)
    const [useDetails,setUserDetails] = React.useState({})
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
    return (
        <div className="chatRoomCardBox flexBox" onClick={()=>history.push(`/messenger/${chatID}`)}>
            <div className="chatRoomUserImage">
                <StatusDot width="12px" height="12px" />
                <img src={useDetails?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetails">
                <p>{`${useDetails?.first_name} ${useDetails?.last_name}`}</p>
                <small><span>{message}</span> . <span>{time}</span></small>
            </div>
        </div>
    )
}

export default ChatRoomCard
