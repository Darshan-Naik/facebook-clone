import React from 'react';
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"

function DeletePostModal({handleCancel,handleDelete}) {
    return (
        <div className="deletePostModalContainer">
            <div className="deletePostModalBox flexBox">
                <div className="deletePostModaleHeader flexBox">
                    <h1>Delete Post</h1>
                    <div className="flexBox">
                        <CloseIcon onClick={handleCancel}/>
                    </div> 
                </div>
                <div className="deletePostModaleMiddle">      
                    <p className="">Are you sure, you will never get this post again...</p>
                </div>
                <div className="deletePostModaleFooter flexBox">
                    <button  onClick={handleDelete}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal
