import React, { useState } from 'react';
import UserProfilePicture from "./UserProfilePicture";
import UserProfileNavBar from "./UserProfileNavBar";
import "../../../Styles/UserProfile/UserProfile.css";

const UserProfilePage = ({ coverPhoto, currentUser = true}) => {
    const [userProfilePicOptions, setUserProfilePicOptions] = useState(true);
    const [addBioVisibility, setAddBioVisibility] = useState(false);
    const [textFieldQuery, setTextFieldQuery] = useState("");
    
    const handleOptionsVisibility = (e) => {
        e.stopPropagation();
        setUserProfilePicOptions(!userProfilePicOptions);
    };

    const handleAddBioVisiblity = () => {
        setAddBioVisibility(!addBioVisibility);
        setTextFieldQuery("");
    };
    
    return (
        <div className="userProfileContainer" onClick={() => setUserProfilePicOptions(true)}>
            <div className="userProfileCoverPageBox" style={{backgroundImage: `url(${coverPhoto})`}}>
                <div className="userProfileCoverPageOverlay">
                    <div className="userProfileCoverPhotoBox" style={coverPhoto ? {backgroundImage: `url(${coverPhoto})`}: {backgroundColor: `#f0f2f5`}}>
                        <UserProfilePicture userProfilePicOptions={userProfilePicOptions} handleOptionsVisibility={handleOptionsVisibility} />
                        {
                            currentUser && (
                                <div className="userProfileEditCoverPhotoContainer flexBox">
                                    <div className="userProfileEditCoverPhotoBox">
                                        <img className="userProfileEditCoverCamIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="camera"/>
                                        <span className="userProfileEditCoverNamePlate">Edit Cover Photo</span>
                                    </div>
                                </div>
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
                                        <img className="addBioGlobeIcon" src={process.env.PUBLIC_URL + '/Images/publicGlobe_icon.png'} alt="Public"/>
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
            <UserProfileNavBar />
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
        </div>
    )
}

export default UserProfilePage
