import React from 'react';
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg";
import {ReactComponent as TrashIcon} from  "../../Icons/trash.svg";
import PopUp from "../../SharedComponents/PopUp";

function DeletePostModal({handleCancel,handleDelete}) {
    return (
        <div className="deletePostModalContainer">
            <PopUp className="deletePostModalBox flexBox">
                <div className="deletePostModaleHeader flexBox">
                    <h1>Delete Post</h1>
                    <div className="flexBox">
                        <CloseIcon onClick={handleCancel}/>
                    </div> 
                </div>
                <div className="deletePostModaleMiddle flexBox">
                    <TrashIcon/>      
                    <p>Are you sure, you will never get this post again...</p>
                </div>
                <div className="deletePostModaleFooter flexBox">
                    <button className="postDeleteButton"  onClick={handleDelete}>Yes</button>
                    <button  onClick={handleCancel}>No</button>
                </div>
            </PopUp>
        </div>
    )
}

export default DeletePostModal
