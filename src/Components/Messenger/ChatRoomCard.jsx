import React from 'react'
import StatusDot from "../../SharedComponents/StatusDot"

function ChatRoomCard({profilePic,first_name ="User",last_name="Name",message ="Text",time="while ago"}) {
    return (
        <div className="chatRoomCardBox flexBox">
            <div className="chatRoomUserImage">
                <StatusDot width="12px" height="12px" />
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetails">
                <p>{`${first_name} ${last_name}`}</p>
                <small><span>{message}</span> . <span>{time}</span></small>
            </div>
        </div>
    )
}

export default ChatRoomCard
