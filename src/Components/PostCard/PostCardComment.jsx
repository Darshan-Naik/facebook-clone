import React from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import {ReactComponent as CameraIcon} from  "../../Icons/cameraIcon.svg";
import {ReactComponent as EmojiIcon} from  "../../Icons/happyFace.svg";
import CommentBox from './CommentBox';
import EmojiMart from "../../SharedComponents/EmojiMart"


function PostCardComment({postId,comments}) {
    
    const [comment,setComment]=React.useState("")
    const [limit, setLimit]=React.useState(2)
    const [emojiVisibility,setEmojiVisibility]=React.useState(false)
    const {uid} = useSelector(store=>store.auth.user)
    const handleChange=(e)=>{
        const {value} = e.target;
        setComment(value)
        
        
    }
    const handleSubmit=(e)=>{
        if (e.key === 'Enter') {
            const payload={
                comment,
                time: new Date(),
                author:uid

            }
            database.collection("posts").doc(postId).collection("comments").add(payload);
            
            setComment("")
          }
    }
    
    const handleEmoji=(emoji)=>{
        setComment(comment + emoji.native)
    }


    return (
        <div className="postCardCommentContainer flexBox">
            {comments.length>1?limit===2&&<p onClick={()=>setLimit(comments.length)}>View more {comments.length-2} comments</p>:null}
            {comments?.filter((el,i)=>limit>i).map((el)=><CommentBox key={el.commentId}{...el} />)}
            {limit===comments.length&&<p onClick={()=>setLimit(2)}>View less comments</p>}
            <div className="postCardInputBox flexBox">
                <img src={ process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="mypic" />
                <div className="addComment flexBox">
                    <div className="commentInput flexBox">
                        <input autoComplete ="off" autoFocus type="text" name="comment" id="comment" value={comment} onChange={handleChange} onKeyDown={handleSubmit} placeholder="Write a comment..."/>
                        <div className="flexBox">
                            <EmojiIcon onClick={()=>setEmojiVisibility(!emojiVisibility)}/>
                            <CameraIcon/>
                        </div>
                    </div>
                    {emojiVisibility&&<div className="commentInput1">
                        <EmojiMart handleEmoji={handleEmoji}/>
                        </div>}
                    <small>Press Enter to post.</small>

                </div>
                
            </div>
            
            
        </div>
    )
}

export default PostCardComment
