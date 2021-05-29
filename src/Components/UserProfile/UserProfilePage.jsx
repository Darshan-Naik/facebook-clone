import React, { useState } from 'react';
import UserProfilePicture from "./UserProfilePicture";
import "../../Styles/UserProfile/UserProfile.css";

const UserProfilePage = ({coverPhoto=(process.env.PUBLIC_URL + '/Images/userCoverPageBackgroundImage.png')}) => {
    const [userProfilePicOptions, setUserProfilePicOptions] = useState(true);
    const [addBioVisibility, setAddBioVisibility] = useState(false);
    
    const handleOptionsVisibility = (e) => {
        e.stopPropagation();
        setUserProfilePicOptions(!userProfilePicOptions);
    }

    const handleAddBioVisibility = () => {
        setAddBioVisibility(true)
    }

    return (
        <div className="userProfileContainer" onClick={() => setUserProfilePicOptions(true)}>
            <div className="userProfileCoverPageBox" style={{backgroundImage: `url(${coverPhoto})`}}>
                <div className="userProfileCoverPageOverlay">
                    <div className="userProfileCoverPhotoBox" style={{backgroundImage: `url(${coverPhoto})`}}>
                        <UserProfilePicture userProfilePic={coverPhoto} userProfilePicOptions={userProfilePicOptions} handleOptionsVisibility={handleOptionsVisibility} />
                    </div>
                </div>
            </div>
            <div className="userNameContainer">
                <h1 className="userNamePlate">Vivekanand Ashok Sawkar</h1>
                {
                    !addBioVisibility && <p className="addUserBio" onClick={handleAddBioVisibility}>Add Bio</p>
                }
                {
                    addBioVisibility && (
                        <div>
                            <textarea className="addBioTextField" placeholder="Describe who you are"></textarea>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserProfilePage
