import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { database } from '../../../Firebase/firebase';
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";

const initState = {
    education: "",
    lives: "",
    from: "",
    relationship: ""
}

function EditProfileDataModal ({handleEditUserDetailsModal}){

    const [updateUserDetails, setUpdateUserDetails] = useState(initState);
    
    const user = useSelector( state => state.auth.user );

    const handleUpdateChange = (e) => {
        const { name, value } = e.target
        setUpdateUserDetails({...updateUserDetails, [name]: value});
    }

    const handleUpdateUserDetails = () =>{
        const payload = {}
        for(let key in updateUserDetails ) {
            if( updateUserDetails[key] ) {
                payload[key] = updateUserDetails[key]
            }
        }
        database.collection("users").doc(user.uid).update(payload);
    }

    useEffect(() => {
        const payload = {
            education: user.education || "",
            lives: user.lives || "",
            from: user.from || "",
            relationship: user.relationship || ""
        }
        setUpdateUserDetails(payload)
    }, [user])

    return (
        <div className="postsPageEditUserDetailsModalContainer">
            <div className="postsPageEditUserDetailsModalBox">
                <div className="postsPageEditUserDetailsModalHeader flexBox">
                    <h1 className="postsPageEditDetailsModalHeaderNamePlate">Edit Details</h1>
                    <div className="editUserDetailsModalCloseIconBox flexBox"  onClick={handleEditUserDetailsModal}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="profilePicPreviewContainer">
                    <div className="profilePicPreviewNoteBox flexBox">
                        <form className="flexBox editUserProfileForm">
                            <label>Education</label>
                            <div className="flexBox">
                                <input value={updateUserDetails.education} name="education" onChange={handleUpdateChange} autoFocus type="text" placeholder="I studied at..."/>
                            </div>
                            <label>Lives</label>
                            <div className="flexBox">
                                <input value={updateUserDetails.lives} name="lives" onChange={handleUpdateChange} type="text" placeholder="I live in..."/>
                            </div>
                            <label>From</label>
                            <div className="flexBox">
                                <input value={updateUserDetails.from} name="from" onChange={handleUpdateChange} type="text" placeholder="I'm from..."/>
                            </div>
                            <label>Relationship</label>
                            <div className="flexBox">
                                <select value={updateUserDetails.relationship} name="relationship" onChange={handleUpdateChange} >
                                    <option defaultValue value="">Status</option>
                                    <option value="single" >Single</option>
                                    <option value="In a relationship" >In a relationship </option>
                                    <option value="married">Married</option>
                                    <option value="engaged">Engaged</option>
                                    <option value="it's complicated">It's complicated</option>
                                    <option value="in an open relationship">In an open relationship</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="chooseProfilePicInputContainer flexBox">
                    <div className="userProfilePicEditOptionsBox">
                        <button onClick={handleUpdateUserDetails}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileDataModal
