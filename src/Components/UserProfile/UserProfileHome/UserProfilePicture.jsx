import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { database, storage } from '../../../Firebase/firebase';
import {ReactComponent as UpdateProfilePictureIcon} from "../../../Icons/photos.svg";
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import "../../../Styles/UserProfile/UserProfile.css";

const UserProfilePicture = ({userProfilePic=(process.env.PUBLIC_URL + '/Images/userProfile_icon.png'), currentUser, userProfileDetails}) => {
    
    const [showProfilePicModal, setShowProfilePicModal] = useState(false);
    const [profileImagePreview, setProfileImagePreview] = useState();
    const profilePicImageRef = useRef();

    const { uid } = useSelector( state => state.auth.user );

    const handleProfilePicPreview = () => {
        if( profilePicImageRef.current.files[0] ) {
            const imageUrl = URL.createObjectURL( profilePicImageRef.current.files[0] )
            
            setProfileImagePreview(imageUrl)
        }
    }

    const handleRemovePreview = () => {
        setProfileImagePreview(null);
        profilePicImageRef.current.value = "";
    }

    const handleUpdateProfilePic=()=>{
        const uploadTask =  storage.ref(`profilePicImages/${profilePicImageRef.current.files[0].name}`).put(profilePicImageRef.current.files[0])

        uploadTask.on("state_changed",
            snapshot => {
                console.log(snapshot)
            },
            error => {

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
                        setShowProfilePicModal(false)
                    })
                })
        })
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
                            <div className="editProfilePicModalHeader flexBox">
                                <h1 className="editProfilePicModalHeaderNamePlate">Edit Profile Pic</h1>
                                <div className="editProfilePicModalCloseIconBox flexBox"  onClick={() => setShowProfilePicModal(false)}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className="profilePicPreviewContainer">
                                {
                                    !profileImagePreview && (
                                        <div className="profilePicPreviewNoteBox flexBox">
                                            Choose some image
                                        </div>
                                    )
                                }
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
                                <div className="chooseProfilePicInputBox">
                                    <input ref={profilePicImageRef} type="file" onChange={handleProfilePicPreview}/>
                                </div>
                                <div className="userProfilePicEditOptionsBox">
                                    <button onClick={handleUpdateProfilePic}>Update</button>
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
