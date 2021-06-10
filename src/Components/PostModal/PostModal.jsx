import React from "react";
import PictureCardComment from "./PictureCardComment";
import PictureCardFooter from "./PictureCardFooter";
import PictureCardHeader from "./PictureCardHeader";
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg";
import '../../Styles/PostModal/PostModal.css';
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg";
import {ReactComponent as MainLogo} from  "../../Icons/main-logo.svg";

function PostModal({postEditFunction,handleClosePostModal,uid, id, image,author, video, time, userData, activity, likes, comments, title, handleLike, handleDeleteLike,showComment}){

    return (
        <div className="postDetailsCardContainer">
            <div className="PicImageContainer">
                <button onClick={handleClosePostModal} className="postDetailsModalClose"><CloseIcon /></button>
                <button className="postDetailsModalIcon"><MainLogo /></button>
                {image&&<div className="postDetailsCardImage">
                    <img src={image|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" />
                </div>}
                {video&&<div className="postDetailsCardImage">
                    <video width="1076" height="700" controls >
                        <source src={video} type="video/mp4"/>
                    </video>
                </div>}
            </div>
            <div className="PicInfoContainer">
                <PictureCardHeader {...userData} time={time} image={image} activity={activity}author={author} postEditFunction={postEditFunction}/>
                    {title && <div className="postDetailsCardTags">{title}</div>}
                <div className="postDetailsCardLike flexBox">
                    <div className="flexBox">
                        <LikeEmoji/> 
                        <p>{likes?.length}</p>
                    </div>
                <div className="flexBox">
                    <p>{comments?.length} Comments</p> 
                </div>
            </div>
            
            <PictureCardFooter handleDeleteLike={handleDeleteLike} handleLike={handleLike} like={JSON.stringify(likes).includes(uid)} showComment={showComment}/>
            <PictureCardComment userData={userData} comments={comments} postId={id}/>
           </div>
           
        </div>
    )
}

export default PostModal