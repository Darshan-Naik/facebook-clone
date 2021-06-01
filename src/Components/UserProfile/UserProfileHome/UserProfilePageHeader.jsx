import React, { useEffect, useState } from 'react';
import UserProfilePicture from "./UserProfilePicture";
import UserProfileNavBar from "./UserProfileNavBar";
import { useSelector } from 'react-redux';
import { ReactComponent as UpdateCoverPhotoIcon } from "../../../Icons/photos.svg";
import "../../../Styles/UserProfile/UserProfile.css";

const UserProfilePageHeader = ({ coverPhoto, currentUser, forceRefresh}) => {
    const [userProfilePicOptions, setUserProfilePicOptions] = useState(true);
    const [addBioVisibility, setAddBioVisibility] = useState(false);
    const [editUserProfileCoverPhoto, setEditUserProfileCoverPhoto] = useState(false);
    const [textFieldQuery, setTextFieldQuery] = useState("");
    
    const dark = useSelector(state => state.theme.dark)
    
    const handleOptionsVisibility = (e) => {
        e.stopPropagation();
        setUserProfilePicOptions(!userProfilePicOptions);
    };

    const handleAddBioVisiblity = () => {
        setAddBioVisibility(!addBioVisibility);
        setTextFieldQuery("");
    };

    useEffect(() => {
        forceRefresh();
    }, [])
    
    return (
        <div className="userProfileContainer" onClick={() => setUserProfilePicOptions(true)}>
            <div className="userProfileCoverPageBox" style={{backgroundImage: `url(${coverPhoto})`}}>
                <div className="userProfileCoverPageOverlay">
                    <div className="userProfileCoverPhotoBox" style={coverPhoto ? {backgroundImage: `url(${coverPhoto})`} : ( dark ? {backgroundColor: `#18191a`} : {backgroundColor: `#f0f2f5`} )}>
                        <UserProfilePicture userProfilePic={coverPhoto} userProfilePicOptions={userProfilePicOptions} handleOptionsVisibility={handleOptionsVisibility} />
                        {
                            currentUser && (
                                <React.Fragment>
                                    <div className="userProfileEditCoverPhotoContainer flexBox" onClick={() => setEditUserProfileCoverPhoto(!editUserProfileCoverPhoto)}>
                                        <div className="userProfileEditCoverPhotoBox">
                                            <img className="userProfileEditCoverCamIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="camera"/>
                                            <span className="userProfileEditCoverNamePlate">Edit Cover Photo</span>
                                        </div>
                                    </div>
                                    {
                                        editUserProfileCoverPhoto && (
                                            <div className="editUserProfileCoverPhotoModalBox flexBox">
                                                <div className="flexBox editUserProfileCoverPhotoIconBox">
                                                    <UpdateCoverPhotoIcon />
                                                    <p>Update Cover Photo</p>
                                                </div>
                                                <button className="editUserProfileCoverPhotoUpdateButton">Update</button>
                                            </div>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="userNameContainer">
                <h1 className="userNamePlate">No Name</h1>
                <React.Fragment>
                    {
                        currentUser && !addBioVisibility && <p className="addUserBio" onClick={handleAddBioVisiblity}>Add Bio</p>
                    }
                    {
                        currentUser && addBioVisibility && (
                            <div className="addBoxTexFieldContainer">
                                <textarea className="addBioTextField" value={textFieldQuery} onChange={(e) => setTextFieldQuery(e.target.value)} placeholder="Describe who you are"></textarea>
                                <div className="addBioTextFieldCharCount">
                                    {`${101 - textFieldQuery.length} characters remaining`}
                                </div>
                                <div className="flexBox addBioButtonContainer">
                                    <div className="flexBox">
                                        <img className="addBioGlobeIcon" src={process.env.PUBLIC_URL + '/Images/public_globe_icon.png'} alt="Public"/>
                                        <span>Public</span>
                                    </div>
                                    <div className="addBioButtonBox">
                                        <button onClick={handleAddBioVisiblity}>Cancel</button>
                                        <button disabled={ textFieldQuery === "" || textFieldQuery.length > 101 }>Save</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </React.Fragment>
            </div>
        </div>
    )
}

export default UserProfilePageHeader
