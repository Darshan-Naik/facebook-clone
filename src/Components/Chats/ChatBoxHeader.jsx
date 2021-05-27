import React from 'react'
import StatusDot from "../../SharedComponents/StatusDot"
import {ReactComponent as MinimizeIcon} from  "../../Icons/minimize.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
function ChatBoxHeader({firstName,lastName,activeStatus,profilePic}) {
    return (
        <div className="chatBoxHeader flexBox">
            <div className="chatBoxUser flexBox">     
                <div className="chatBoxUserImage">
                        <img  src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                        <StatusDot bottom={5} right={2} width="12px" height="12px"/>
                </div>
                <div className="chatBoxUserDetails flexBox">
                    <h4>{ firstName? `${firstName} ${lastName}` : "User"}</h4>
                    <small>{activeStatus || "While ago"}</small>
                </div>
            </div>
            <div className="chatBoxHeaderIcons flexBox">
                <MinimizeIcon />
                <CloseIcon />
            </div>
        </div>
    )
}

export default ChatBoxHeader
