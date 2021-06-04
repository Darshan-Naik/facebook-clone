import React, { useEffect, useRef, useState } from 'react';
import UserProfilePicture from "./UserProfilePicture";
import { useSelector } from 'react-redux';
import { ReactComponent as UpdateCoverPhotoIcon } from "../../../Icons/photos.svg";
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import "../../../Styles/UserProfile/UserProfile.css";
import { database, storage } from '../../../Firebase/firebase';

const UserProfilePageHeader = ({ coverPhoto, currentUser, forceRefresh, userProfileDetails}) => {

    const [addBioVisibility, setAddBioVisibility] = useState(false);
    const [textFieldQuery, setTextFieldQuery] = useState("");
    const [showCoverPicModal, setShowCoverPicModal] = useState(false);
    const [coverPicImagePreview, setCoverPicImagePreview] = useState();

    const coverPicImageRef = useRef();
    
    const dark = useSelector(state => state.theme.dark);
    const { uid } = useSelector( state => state.auth.user );
    
    const handleAddBioVisiblity = () => {
        setAddBioVisibility(!addBioVisibility);
        setTextFieldQuery("");
    };

    const handleChangeCoverPicPreview = () => {
        if( coverPicImageRef.current.files[0] ){
            const imageUrl = URL.createObjectURL( coverPicImageRef.current.files[0] )
            setCoverPicImagePreview(imageUrl)
        }
    }

    const handleRemvoeCoverPicPreview = () => {
        setCoverPicImagePreview(null);
        coverPicImageRef.current.value = "";
    }

    const handleUpdateCoverPic = () => {
        const uploadTask =  storage.ref(`coverPicImages/${coverPicImageRef.current.files[0].name}`).put(coverPicImageRef.current.files[0])

        uploadTask.on("state_changed",
            snapshot => {
                console.log(snapshot)
            },
            error => {

            },
            () => {
                storage.ref("coverPicImages")
                .child(coverPicImageRef.current.files[0].name)
                .getDownloadURL()
                .then(url=>{
                    const payload ={
                        image : url,
                        imagePath : coverPicImageRef.current.files[0].name,
                        activity: `updated his cover photo.` ,
                        author : uid,
                        time : new Date()
                    }
                    database.collection("users").doc(uid).update({coverPic: url, coverPicPath: coverPicImageRef.current.files[0].name })
                    database.collection("posts").add(payload)
                    .then(()=>{
                        coverPicImageRef.current.value = "";
                        setShowCoverPicModal(false);
                    })
                })
        })
    };

    const handleUpdateUserBio = () => {
        setAddBioVisibility(false);
        database.collection('users').doc(uid).update({userBio: textFieldQuery})
        .then(() => {
            setTextFieldQuery("");
        })
    }

    useEffect(() => {
        forceRefresh();
    }, [])
    
    return (
        <div className="userProfileContainer">
            <div className="userProfileCoverPageBox" style={{backgroundImage: `url(${coverPhoto})`}}>
                <div className="userProfileCoverPageOverlay">
                    <div className="userProfileCoverPhotoBox" style={coverPhoto ? {backgroundImage: `url(${coverPhoto})`} : ( dark ? {backgroundColor: `#18191a`} : {backgroundColor: `#f0f2f5`} )}>
                        <UserProfilePicture currentUser={currentUser} userProfileDetails={userProfileDetails} />
                        {
                            currentUser === uid && (
                                <React.Fragment>
                                    <div className="userProfileEditCoverPhotoContainer flexBox" onClick={() => setShowCoverPicModal(true)} title="Edit cover photo">
                                        <div className="userProfileEditCoverPhotoBox">
                                            <img className="userProfileEditCoverCamIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="camera"/>
                                            <span className="userProfileEditCoverNamePlate">Edit Cover Photo</span>
                                        </div>
                                    </div>
                                    {
                                        showCoverPicModal && (
                                            <div className="editProfilePicModalContainer">
                                                <div className="editProfilePicModalBox">
                                                    <div className="editProfilePicModalHeader flexBox">
                                                        <h1 className="editProfilePicModalHeaderNamePlate">Edit Cover Pic</h1>
                                                        <div className="editProfilePicModalCloseIconBox flexBox"  onClick={() => setShowCoverPicModal(false)}>
                                                            <CloseIcon />
                                                        </div>
                                                    </div>
                                                    <div className="profilePicPreviewContainer">
                                                        {
                                                            !coverPicImagePreview && (
                                                                <div className="profilePicPreviewNoteBox flexBox">
                                                                    Choose some image
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            coverPicImagePreview && (
                                                                <React.Fragment>
                                                                    <div className="profilePicPreviewImage">
                                                                        <img src={coverPicImagePreview} alt="coverImage"/>
                                                                    </div>
                                                                    <div className="profilePicPreviewCloseIconBox flexBox" onClick={handleRemvoeCoverPicPreview}>
                                                                        <CloseIcon />
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="chooseProfilePicInputContainer flexBox">
                                                        <div className="chooseProfilePicInputBox">
                                                            <input ref={coverPicImageRef} type="file" onChange={handleChangeCoverPicPreview}/>
                                                        </div>
                                                        <div className="userProfilePicEditOptionsBox">
                                                            <button onClick={handleUpdateCoverPic}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                        <div className="userProfileCoverPhotoBoxOveryLay" ></div>
                    </div>
                </div>
            </div>
            <div className="userNameContainer">
                <h1 className="userNamePlate">{`${userProfileDetails.first_name} ${userProfileDetails.last_name}`}</h1>
                <React.Fragment>
                    {
                       userProfileDetails.userBio && <p className="userProfileBioContent">{userProfileDetails.userBio}</p>
                    }
                    {
                        currentUser === uid && !addBioVisibility && !userProfileDetails.userBio && <p className="addUserBio" onClick={handleAddBioVisiblity}>Add Bio</p>
                    }
                    {
                        currentUser === uid && !addBioVisibility && userProfileDetails.userBio && <p className="addUserBio" onClick={handleAddBioVisiblity}>Edit Bio</p>
                    }
                    {
                        currentUser === uid && addBioVisibility && (
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
                                        <button disabled={ textFieldQuery === "" || textFieldQuery.length > 101 } onClick={handleUpdateUserBio}>Save</button>
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
