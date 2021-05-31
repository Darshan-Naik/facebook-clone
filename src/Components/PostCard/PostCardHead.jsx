import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"

function PostCardHead({img,clientName,time}) {
    return (
        <div className="postCardHeadContainer flexBox">
            <div className="postCardHeadBox1">
                <img src={img|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            </div>
            <div className="postCardHeadBox2 flexbox">
                <div><strong>{clientName||"NAME"}</strong></div>
                <div><span>{time||"Yesterday at 9:50 AM"}</span></div> 
            </div>
            <div className="postCardHeadBox3"><DotsIcon/></div>
            
        </div>
    )
}

export default PostCardHead
