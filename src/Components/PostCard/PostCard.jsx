import React from 'react';
import PostCardFooter from './PostCardFooter';
import PostCardHead from './PostCardHead';
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg"

//const 

function PostCard({tag,img}) {
    return (
        <div className="postCardContainer">
            <PostCardHead/>
            <div className="postCardTags">{tag||"Having fun!"}</div>
            <div className="postCardImage"><img src={img|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="img" /></div>
            <div className="postCardLike flexBox">
                <div><LikeEmoji/>{}</div>
                <div></div>
            </div>
            <PostCardFooter/>
        </div>
    )
}

export default PostCard
