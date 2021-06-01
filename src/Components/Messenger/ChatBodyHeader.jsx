import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'
import {ReactComponent as Alert} from  "../../Icons/alert.svg"

function ChatBodyHeader({handleUserDetailsVisibility,profilePic,first_name ="User",last_name="Name",time="Active Now"}) {
    return (
        <div className="chatBodyHeaderContainer flexBox">
            <div className="chatBodyHeaderUserDetails flexBox">
                <div className="chatBodyHeaderUserImage">
                    <StatusDot />
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
                </div>
                <div className="chatBodyHeaderUserDetailsData flexBox">
                    <p>{`${first_name} ${last_name}`}</p>
                    <small>{time}</small>
                </div>
            </div>
            <div className="chatBodyHeaderIcons flexBox">
                         <Alert onClick={handleUserDetailsVisibility}/>   
            </div>
        </div>
    )
}

export default ChatBodyHeader
