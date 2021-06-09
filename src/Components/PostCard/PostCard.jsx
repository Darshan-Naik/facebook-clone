import React from 'react';
import PostCardFooter from './PostCardFooter';
import PostCardHead from './PostCardHead';
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg"
import PostCardComment from './PostCardComment';
import { database } from '../../Firebase/firebase';
import { useSelector } from 'react-redux';



function PostCard({title,image,id,author,time,video,activity}) {
    const[commentSection,setCommentSection]=React.useState(false);
    const[likes,setLikes]=React.useState([]);
    const [comments,setComments]=React.useState([]);
    const [userData,setUserData]=React.useState({});

    const {uid} = useSelector(store=>store.auth.user)

    const showComment =()=>{
        setCommentSection(!commentSection)
    }

    const handleEditPost=(editTitle) => {
        const payload={
            title:editTitle
        }
        database.collection("posts").doc(id).update(payload);
      
    }

    const handleSetProfilePic=()=>{
        database.collection("users").doc(uid).update({profilePic:image});
        

    }

    const handleDeletePost=()=>{
        //database.collection("posts").doc(id).delete();
        
    }

    const handleLike=()=>{
        const payload={
            like:"like",
            time: new Date(),
            author:uid

        }
        const notificationPayload={
            author:uid, 
            time : new Date(),
            action:"liked your post.",
            isRead:false,
            tag:"like"
        }

        database.collection("posts").doc(id).collection("likes").add(payload);
        database.collection("users").doc(userData.uid).collection("notifications").add(notificationPayload);
    }

    const handleDeleteLike=()=>{
        const deleteLike = likes.filter((item)=>item.author===uid)
        database.collection("posts").doc(id).collection("likes").doc(deleteLike[0].likeId).delete()
    }

    React.useEffect(()=>{
        database.collection("posts").doc(id).collection("likes").onSnapshot(response=>{
            setLikes(response.docs.map(doc=>({likeId:doc.id,...doc.data()})))
        })
    },[])

    React.useEffect(()=>{
        database.collection("posts").doc(id).collection("comments").orderBy("time","asc").onSnapshot(response=>{
            setComments(response.docs.map(doc=>({commentId:doc.id,...doc.data()})))
        })
    },[])


    React.useEffect(() => {
        const unsubscribe = database.collection("users").doc(author)
        .onSnapshot((doc) => {
            setUserData(doc.data());
            
        });
        return () => {
            unsubscribe();
        }
    }, [])



    return (
        <div className="postCardContainer">
            <PostCardHead {...userData} postEditFunction={{handleEditPost,handleDeletePost,handleSetProfilePic}} time={time} author={author} image={image}title={title} activity={activity}/>
            {title && <div className="postCardTags">{title}</div>}
            {image&&<div className="postCardImage"><img src={image|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" /></div>}
            {video&&<div className="postCardImage">
                <video width="100%" height="500" controls >
                    <source src={video} type="video/mp4"/>
                </video>
            </div>}
            <div className="postCardLike flexBox">
                <div className="flexBox"><LikeEmoji/> <p>{likes.length}</p></div>
                <div className="flexBox"><p onClick={showComment}>{comments.length} Comments</p> </div>
            </div>
            <PostCardFooter handleDeleteLike={handleDeleteLike} handleLike={handleLike} like={JSON.stringify(likes).includes(uid)} showComment={showComment}/>
           {commentSection && <PostCardComment postId={id} comments={comments} userData={userData}/>}
        </div>
    )
}

export default PostCard
