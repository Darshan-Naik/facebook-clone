import React, { useState } from 'react';
import SideBarContent from "../SideBar/SideBarContent";
import "../../Styles/UserProfile/UserProfile.css";

const UserProfilePicture = ({userProfilePic=(process.env.PUBLIC_URL + '/Images/userProfile_icon.png'), userProfilePicOptions, handleOptionsVisibility, currentUser=true}) => {
    
    return (
        <React.Fragment className="userProfilePictureContainer">
            <div className="userProfilePictureBox" onClick={handleOptionsVisibility}>
                <div className="userProfilePicture" style={{backgroundImage: `url(${userProfilePic})`}}></div>
                {
                    currentUser && 
                    <div className="userProfilePictureCameraIconBox">
                        <img className="userProfileCameraIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="Cam"/>
                    </div>
                }
            </div>
            {
                currentUser &&
                <div className="userProfilePicEditOptions" hidden={userProfilePicOptions}>
                    <div className="flexBox">
                    <p>View Profile Picture</p>
                    <button onClick={() => alert("HELLO")}>Update</button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default UserProfilePicture
