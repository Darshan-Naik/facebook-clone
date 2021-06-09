import React from 'react';
import PostCardFooter from './PostCardFooter';
import PostCardHead from './PostCardHead';
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg"
import PostCardComment from './PostCardComment';
import { database, storage } from '../../Firebase/firebase';
import { useSelector } from 'react-redux';
import PostModal from '../PostModal/PostModal';
import PostCardSkeleton from './Skeleton/PostCardSkeleton';



function PostCard({title,image,imagePath,id,author,time,video,activity}) {
    const[commentSection,setCommentSection]=React.useState(false);
    const[likes,setLikes]=React.useState([]);
    const [comments,setComments]=React.useState([]);
    const [userData,setUserData]=React.useState(null);
    const [postModalVisibility,setPostModalVisibility]=React.useState(false);
    const [loading, setLoading]=React.useState(true);
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
        const payload ={
            image,
            imagePath,
            activity: `changed his profile picture.` ,
            author : uid,
            time : new Date()
        }
       
        database.collection("posts").add(payload)
        database.collection("users").doc(uid).update({profilePic:image});
        

    }
    console.log(imagePath)

    const handleDeletePost=()=>{
        database.collection("posts").doc(id).delete();
        storage.ref("postImages").child(imagePath).delete();
        
    }

    const handleClosePostModal=()=>{
        setPostModalVisibility(false)
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
        if(uid!==userData.uid){
            database.collection("users").doc(userData.uid).collection("notifications").add(notificationPayload);
        }
        
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
        <>
        <div className="postCardContainer" style={{display:loading||!userData?"none":"block"}}>
            <PostCardHead {...userData} postEditFunction={{handleEditPost,handleDeletePost,handleSetProfilePic}} time={time} author={author} image={image}title={title} activity={activity}/>
            {title && <div className="postCardTags">{title}</div>}
            {image&&<div onClick={()=>setPostModalVisibility(true)} className="postCardImage"><img onLoad={()=>setLoading(false)} src={image|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" /></div>}
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
        {postModalVisibility &&<PostModal handleClosePostModal={handleClosePostModal} uid={uid} image={image} video={video} time={time} userData={userData}  activity={activity} id={id} likes={likes} comments={comments} title={title} handleLike={handleLike} handleDeleteLike={handleDeleteLike} />}
       
    
        <div className="postCardContainer" style={{display:loading||!userData?"block":"none"}}>
            <PostCardSkeleton/>
        </div>
        </>)
}

export default PostCard
