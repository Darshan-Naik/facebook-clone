import React from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import {ReactComponent as CameraIcon} from  "../../Icons/cameraIcon.svg";
import {ReactComponent as EmojiIcon} from  "../../Icons/happyFace.svg";
import CommentBox from './CommentBox';
import EmojiMart from "../../SharedComponents/EmojiMart"
import { useHistory } from 'react-router';


function PostCardComment({postId,comments,userData}) {
    
    const [comment,setComment]=React.useState("")
    const [limit, setLimit]=React.useState(2)
    const [emojiVisibility,setEmojiVisibility]=React.useState(false)

    const history =useHistory();
    const {uid,profilePic} = useSelector(store=>store.auth.user)

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
            const notificationPayload={
                author:uid, 
                time : new Date(),
                action:"commented on your post.",
                comment,
                isRead:false,
                tag:"comment"
            }
            database.collection("posts").doc(postId).collection("comments").add(payload);
            database.collection("users").doc(userData.uid).collection("notifications").add(notificationPayload);
            setComment("")
          }
    }
    
    const handleEmoji=(emoji)=>{
        setComment(comment + emoji.native)
    }


    return (
        <div className="postCardCommentContainer flexBox">
            {comments.length>2?limit===2&&<p onClick={()=>setLimit(comments.length)}>View more {comments.length-2} comments</p>:null}
            {comments?.filter((el,i)=>(comments.length-limit)<=i).map((el)=><CommentBox key={el.commentId}{...el} />)}
            {limit===comments.length&&comments.length>2&&<p onClick={()=>setLimit(2)}>View less comments</p>}
            <div className="postCardInputBox flexBox">
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} onClick={()=>history.push(`/profile/${uid}`)} alt="mypic" />
                <div className="addComment flexBox">
                    <div className="commentInput flexBox">
                        <input autoComplete ="off" autoFocus type="text" name="comment" id="comment" value={comment} onChange={handleChange} onKeyDown={handleSubmit} placeholder="Write a comment..."/>
                        <div className="postEmojiMartContainer flexBox">
                            <EmojiIcon onClick={()=>setEmojiVisibility(!emojiVisibility)}/>
                            {/* <CameraIcon/> */}
                            {emojiVisibility&&<div className="commentInput1">
                                <EmojiMart handleEmoji={handleEmoji}/>
                            </div>}
                        </div>
                    </div>
                    
                    <small>Press Enter to post.</small>

                </div>
                
            </div>
            
            
        </div>
    )
}

export default PostCardComment
