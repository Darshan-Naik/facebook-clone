import React from 'react'
import { database } from '../../Firebase/firebase';

function CommentBox({comment,author,time}) {
    const [userData,setUserData]=React.useState({})
    const {first_name,last_name,profilePic}=userData;

    const localTime =  new Date(time.toDate()).toLocaleTimeString();

    React.useEffect(()=>{
      
        const unsubscribe = database.collection("users").where("uid", "==", author)
        .onSnapshot((res) => {
            res.docs.map( doc => {
                setUserData({ ...doc.data(), docUpdateId: doc.id });
                
            });
        });
        return () => {
            unsubscribe();
        }
            
    }, [])



    return (
        <div className="postCardInputBox flexBox">
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="otherspic" />
                <div className="addComment flexBox">
                    <div className="addCommentBox flexBox">
                        <strong>{`${first_name} ${last_name}`}</strong>
                        <small>{comment}</small>
                    </div>
                    <div className="postCardCommentLikeandReply flexBox">
                        <small>Like  </small>
                        <samp>·</samp>
                        <small>Reply </small>
                        <samp>·</samp>
                        <p>{localTime}</p>

                    </div>
                    
                    
                </div>

            </div>
    )
}

export default CommentBox
