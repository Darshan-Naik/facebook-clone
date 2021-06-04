import React from 'react'
import {ReactComponent as SaveIcon} from  "../../Icons/save.svg";
// import {ReactComponent as EditIcon} from  "../../Icons/edit.svg";
// import {ReactComponent as RemoveIcon} from  "../../Icons/remove.svg";

function EditBox() {
    return (
        <div className="editPostContainer">
            <div className="editPost flexBox">
                <div className="editBox flexBox"><SaveIcon/><p>Edit Post</p></div>
                <div className="editBox flexBox"><SaveIcon/><p>Set as Profile Pic</p></div>
                <div className="editBox flexBox"><SaveIcon/><p>Delete Post</p></div>
            </div>
            
        </div>
    )
}

export default EditBox
