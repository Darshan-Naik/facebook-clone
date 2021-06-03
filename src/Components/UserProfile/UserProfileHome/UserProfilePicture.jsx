import React from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as UpdateProfilePictureIcon} from "../../../Icons/photos.svg";
import "../../../Styles/UserProfile/UserProfile.css";

const UserProfilePicture = ({userProfilePic=(process.env.PUBLIC_URL + '/Images/userProfile_icon.png'), userProfilePicOptions, handleOptionsVisibility, currentUser}) => {
    
    const { first_name, last_name } = useSelector( state => state.auth.user );

    return (
        <div className="userProfilePictureContainer">
            <div className="userProfilePictureContainer userProfilePictureBox" onClick={handleOptionsVisibility}>
                <div className="userProfilePicture" style={{backgroundImage: `url(${userProfilePic})`}}></div>
                {
                    currentUser === `${first_name} ${last_name}` && 
                    <div className="userProfilePictureCameraIconBox">
                        <img className="userProfileCameraIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="Cam"/>
                    </div>
                }
            </div>
            {
                currentUser === `${first_name} ${last_name}` &&
                <div className="userProfilePicEditOptionsContainer" hidden={userProfilePicOptions}>
                    <div className="flexBox userProfilePicEditOptionsBox">
                        <div className="flexBox userProfilePicEditOptionNamePlate">
                            <UpdateProfilePictureIcon />
                            <p>Update Profile Picture</p>
                        </div>
                        <button onClick={() => alert("HELLO")}>Update</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfilePicture
