import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import StatusDot from "../../SharedComponents/StatusDot"

function ChatRoomCard({chatID,authors,message ="Text",time="while ago"}) {

    const users = useSelector(store=>store.app.users)
    const uid = useSelector(store=>store.auth.user.uid)
    const [useDetails,setUserDetails] = React.useState({})
    const history =useHistory()
    React.useEffect(()=>{
        const senderID = authors.filter(id=>id !==uid)
        const user = users.filter(item=>item.uid === senderID[0])
        setUserDetails(user[0])
    },[])
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
