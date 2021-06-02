import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'

function UserDetails({profilePic,first_name ="User",last_name="Name",time="Active Now"}) {
    return (
        <div className="chatRoomUserDetailsContainer flexBox scroll">
            <div className="chatRoomUserDetailsImage">
                <StatusDot   width= "18px" height= "18px" right="15px"/>
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetailsData">
                <p>{`${first_name} ${last_name}`}</p>
                <small>{time}</small>
            </div>
            
        </div>
    )
}

export default UserDetails
