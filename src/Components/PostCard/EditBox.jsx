import React from 'react'
import {ReactComponent as RemoveIcon} from  "../../Icons/close.svg";


function EditBox() {
    return (
        <div className="editPostContainer">
            <div className="editPost flexBox">
                <div className="editBox flexBox">
                    <img src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="editIcon" />
                    <p>Edit Post</p>
                </div>
                <div className="editBox flexBox">
                <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="setIcon" />
                    <p>Set as Profile Pic</p>
                </div>
                <div className="editBox editPost1 flexBox">
                    <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="removeIcon" />
                    <p>Delete Post</p>
                </div>
            </div>
            
        </div>
    )
}

export default EditBox
