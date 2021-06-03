import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import { useHistory } from 'react-router-dom';

function PostCardHead({first_name,last_name,profilePic,time, uid}) {
    const localTime =  new Date(time.toDate()).toLocaleTimeString();
    const history = useHistory();

    return (
        <div className="postCardHeadContainer flexBox">
            <div className="postCardHeadBox1">
                <img src={profilePic|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            </div>
            <div className="postCardHeadBox2 flexbox">
                <div onClick={() => history.push(`/profile/${uid}`)}><strong>{`${first_name} ${last_name}`}</strong></div>
                <div><span>{localTime}</span></div> 
            </div>
            <div className="postCardHeadBox3 flexBox"><DotsIcon/></div>
            
        </div>
    )
}

export default PostCardHead
