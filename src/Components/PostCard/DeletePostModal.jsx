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
                <div className="deletePostModaleMiddle flexBox">
                    <img src={process.env.PUBLIC_URL + '/Images/trash.png'}  alt="trash" />      
                    <p>Are you sure, you will never get this post again...</p>
                </div>
                <div className="deletePostModaleFooter flexBox">
                    <button className="postDeleteButton"  onClick={handleDelete}>Yes</button>
                    <button  onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal
