import React, { useEffect } from 'react';
import PostCardFooter from './PostCardFooter';
import PostCardHead from './PostCardHead';
import {ReactComponent as LikeEmoji} from  "../../Icons/likeEmoji.svg"
import PostCardComment from './PostCardComment';
import { database } from '../../Firebase/firebase';
import { useSelector } from 'react-redux';

//const 

function PostCard({title,image,id,author,time}) {
    const[commentSection,setCommentSection]=React.useState(false);
    const[likes,setLikes]=React.useState([]);
    const [comments,setComments]=React.useState([]);
    const [userData,setUserData]=React.useState({});

    const {uid} = useSelector(store=>store.auth.user)
    const showComment =()=>{
        setCommentSection(!commentSection)
    }
    const handleLike=()=>{
        const payload={
            like:"like",
            time: new Date(),
            author:uid

        }
        database.collection("posts").doc(id).collection("likes").add(payload);
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
            <PostCardHead {...userData} time={time}/>
            {title && <div className="postCardTags">{title}</div>}
            <div className="postCardImage"><img src={image|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" /></div>
            <div className="postCardLike flexBox">
                <div className="flexBox"><LikeEmoji/> <p>{likes.length}</p></div>
                <div className="flexBox"><p>{comments.length} Comments</p> </div>
            </div>
            <PostCardFooter handleDeleteLike={handleDeleteLike} handleLike={handleLike} like={JSON.stringify(likes).includes(uid)} showComment={showComment}/>
           {commentSection && <PostCardComment postId={id} comments={comments}/>}
        </div>
    )
}

export default PostCard
