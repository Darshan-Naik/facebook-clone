import React from 'react'

function PostCardComment({img}) {
    return (
        <div className="postCardCommentContainer flexBox">
            <div>view more comments

            </div>
            <div className="PostCardInputBox flexBox">
                <div><img src={img|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="mypic" /></div>
                <div className="commentInput"><input type="text" name="comment" id="comment" /></div>
            </div>
            
        </div>
    )
}

export default PostCardComment
