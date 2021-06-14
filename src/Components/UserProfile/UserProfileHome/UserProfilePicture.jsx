import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { database, storage } from '../../../Firebase/firebase';
import { DisappearedLoading } from 'react-loadingg';
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import useVisibility from '../../../Hooks/useVisibility';
import PopUp from "../../../SharedComponents/PopUp";
import "../../../Styles/UserProfile/UserProfile.css";
import Compress from "react-image-file-resizer";

const UserProfilePicture = ({userProfilePic=(process.env.PUBLIC_URL + '/Images/userProfile_icon.png'), currentUser, userProfileDetails}) => {
    
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [coverPicUploadState, setCoverPicUploadState] = useState(0);
    const [errorImagePreview, setErrorImagePreview] = useState(false);

    const [showProfilePicModal, toggleShowProfilePicModal] = useVisibility();

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
    };

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
                        console.log("error is occurring");
                    },
                    () => {
                        storage.ref("profilePicImages")
                        .child(profilePicImageRef.current.files[0].name)
                        .getDownloadURL()
                        .then(url=>{
                            Compress.imageFileResizer(
                                profilePicImageRef.current.files[0], // the file from input
                                400, // width
                                400, // height
                                "JPEG", // compress format WEBP, JPEG, PNG
                                70, // quality
                                0, // rotation
                                (uri) => {
                           
                                let file =  new File([uri],"thumb_"+profilePicImageRef.current.files[0].name, { lastModified: new Date().getTime(), type: uri.type })
                                console.log(file);
                                const uploadTask =  storage.ref(`postImages/${file.name}`).put(file)

                                    uploadTask.on("state_changed",
                                    snapshot =>{
                                        setCoverPicUploadState(Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)+1)
                                    },
                                    error=>{
                    
                                    },
                                    ()=>{
                                        storage.ref("postImages")
                                        .child(file.name)
                                        .getDownloadURL()
                                        .then(thumb_url=>{

                                            const payload ={
                                                image : url,
                                                thumb_url,
                                                imagePath : profilePicImageRef.current.files[0].name,
                                                activity: `updated his profile picture.` ,
                                                author : uid,
                                                time : new Date()
                                            }
                                            database.collection("users").doc(uid).update({profilePic: thumb_url, profilePicPath: profilePicImageRef.current.files[0].name })
                                            database.collection("posts").add(payload)
                                            .then(()=>{
                                                profilePicImageRef.current.value = "";
                                                toggleShowProfilePicModal();
                                                setCoverPicUploadState(0);
                                            })
                                        })
                                    },
                                )
                            },
                            "blob" // blob or base64 default base64
                        )                           
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
                        <div className="userProfilePictureCameraIconBox" onClick={toggleShowProfilePicModal} title="Edit profile picture">
                            <img className="userProfileCameraIcon" src={process.env.PUBLIC_URL + '/Images/camera_icon.png'} alt="Cam"/>
                        </div>
                    }
                </div>
            </div>
            {
                showProfilePicModal && (
                    <div className="editProfilePicModalContainer" onClick={toggleShowProfilePicModal}>
                        <PopUp className="editProfilePicModalBox">
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
                                <div className="editProfilePicModalCloseIconBox flexBox"  onClick={toggleShowProfilePicModal}>
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
                        </PopUp>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default UserProfilePicture
