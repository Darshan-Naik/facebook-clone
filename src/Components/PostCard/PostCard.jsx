import React from 'react';
import PostCardFooter from './PostCardFooter';
import PostCardHead from './PostCardHead';
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg"
import PostCardComment from './PostCardComment';

//const 

function PostCard({tag,img,likeCount,commentCount}) {
    const[commentSection,setCommentSection]=React.useState(false);

    const showComment =()=>{
        setCommentSection(!commentSection)
    }


    return (
        <div className="postCardContainer">
            <PostCardHead/>
            <div className="postCardTags">{tag||"Having fun!"}</div>
            <div className="postCardImage"><img src={img|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" /></div>
            <div className="postCardLike flexBox">
                <div className="flexBox"><LikeEmoji/> <p>{likeCount||"0"}</p></div>
                <div className="flexBox"><p>{commentCount||"0"} Comments</p> </div>
            </div>
            <PostCardFooter showComment={showComment}/>
           {commentSection && <PostCardComment/>}
        </div>
    )
}

export default PostCard
