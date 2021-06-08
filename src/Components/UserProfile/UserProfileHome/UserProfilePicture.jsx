import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { database, storage } from '../../../Firebase/firebase';
import { DisappearedLoading } from 'react-loadingg';
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import "../../../Styles/UserProfile/UserProfile.css";

const UserProfilePicture = ({userProfilePic=(process.env.PUBLIC_URL + '/Images/userProfile_icon.png'), currentUser, userProfileDetails}) => {
    
    const [showProfilePicModal, setShowProfilePicModal] = useState(false);
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [coverPicUploadState, setCoverPicUploadState] = useState(0);
    const [errorImagePreview, setErrorImagePreview] = useState(false);

    const profilePicImageRef = useRef();

    const { uid } = useSelector( state => state.auth.user );

    const handleProfilePicPreview = () => {

        if( !profilePicImageRef.current?.files[0]?.type.includes(`image`) ) {
            
            setErrorImagePreview(true);
            
        } else if ( profilePicImageRef.current.files[0] ){
            
            const imageUrl = URL.createObjectURL( profilePicImageRef.current.files[0] )
            setProfileImagePreview(imageUrl)
            setErrorImagePreview(false);
        
        }

    }

    const handleRemovePreview = () => {
        setProfileImagePreview(null);
    }

    const handleUpdateProfilePic=()=>{
        setCoverPicUploadState(1);
        if( profilePicImageRef.current.files[0].name ) {
            if( profilePicImageRef.current.files[0].type.includes(`image`) ) {
                const uploadTask =  storage.ref(`profilePicImages/${profilePicImageRef.current.files[0].name}`).put(profilePicImageRef.current.files[0])
        
                uploadTask.on("state_changed",
                    snapshot => {
                        setCoverPicUploadState(Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)+1);
                    },
                    error => {
                        console.log("error is occuring");
                    },
                    () => {
                        storage.ref("profilePicImages")
                        .child(profilePicImageRef.current.files[0].name)
                        .getDownloadURL()
                        .then(url=>{
                            const payload ={
                                image : url,
                                imagePath : profilePicImageRef.current.files[0].name,
                                activity: `updated his profile picture.` ,
                                author : uid,
                                time : new Date()
                            }
                            database.collection("users").doc(uid).update({profilePic: url, profilePicPath: profilePicImageRef.current.files[0].name })
                            database.collection("posts").add(payload)
                            .then(()=>{
                                profilePicImageRef.current.value = "";
                                setShowProfilePicModal(false);
                                setCoverPicUploadState(0);
                            })
                        })
                })
            }
        }
    }

    return (
        <React.Fragment>
            <div className="userProfilePictureContainer">
                <div className="userProfilePictureContainer userProfilePictureBox">
                    <div className="userProfilePicture" style={{backgroundImage: `url("${ userProfileDetails.profilePic || userProfilePic}")`}}></div>
                    {
                        currentUser === uid && 
                        <div className="userProfilePictureCameraIconBox" onClick={() => setShowProfilePicModal(true)} title="Edit profile picture">
                            <img className="userProfileCameraIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="Cam"/>
                        </div>
                    }
                </div>
            </div>
            {
                showProfilePicModal && (
                    <div className="editProfilePicModalContainer">
                        <div className="editProfilePicModalBox">
                            {
                                coverPicUploadState ? (
                                    <div className="newPostProgressContainer flexBox">
                                        <div className="progressBox">
                                            <h2>uploading...</h2> 
                                            <br />
                                            <br />
                                            <DisappearedLoading size="small"/>
                                        </div>
                                        <div className="progressBarBox">
                                                <div className="progressBar" style={{width:`${coverPicUploadState}%`}}></div>
                                        </div>
                                    </div>
                                ) : null
                            }
                            <div className="editProfilePicModalHeader flexBox">
                                <h1 className="editProfilePicModalHeaderNamePlate">Edit Profile Pic</h1>
                                <div className="editProfilePicModalCloseIconBox flexBox"  onClick={() => setShowProfilePicModal(false)}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className="profilePicPreviewContainer">
                                <div style={profileImagePreview ? {display: `none`}: {display: `block`}}>
                                    {
                                        errorImagePreview && (
                                            <div className="errorCoverPicMessage">
                                                <p>Choose only image...</p>
                                            </div>
                                        )
                                    }
                                    <div className="profilePicPreviewNoteBox flexBox">   
                                        <div className="chooseProfilePicInputBox">
                                            <label htmlFor="coverPicFileInput">Profile Pic</label>
                                            <input ref={profilePicImageRef} id="coverPicFileInput" type="file" onChange={handleProfilePicPreview} style={{visibility: `hidden`}}/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    profileImagePreview && (
                                        <React.Fragment>
                                            <div className="profilePicPreviewImage">
                                                <img src={profileImagePreview} alt=""/>
                                            </div>
                                            <div className="profilePicPreviewCloseIconBox flexBox" onClick={handleRemovePreview}>
                                                <CloseIcon />
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                            <div className="chooseProfilePicInputContainer flexBox">
                                <div className="userProfilePicEditOptionsBox">
                                    <button disabled={!profileImagePreview} onClick={handleUpdateProfilePic}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default UserProfilePicture
