import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import {ReactComponent as FriendsIcon} from  "../../Icons/friends.svg"
import {ReactComponent as DownArrowIcon} from  "../../Icons/downArrow.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import EmojiMart from "../../SharedComponents/EmojiMart"
import { DisappearedLoading } from 'react-loadingg';
import "../../Styles/NewPost/NewPost.css"
import { database, storage } from '../../Firebase/firebase'
import { activities } from '../../Utils/localData'



function NewPostModal({setPostModalVisibility}) {
    const [title,setTitle] = React.useState("")
    const [activity,setActivity] = React.useState(null)
    const {first_name,profilePic,uid,last_name} = useSelector(store=>store.auth.user)
    const imageRef = React.useRef()
    const[postState,setPostState] = React.useState(0)
    const [imageUrl,setImageUrl] = React.useState()
    const [videoUrl,setVideoUrl] = React.useState()
    const [emojiMartVisibility,setEmojiMartVisibility] = React.useState(false)
    const [activityBoxVisibility,setActivityBoxVisibility] = React.useState(false)
    const preview =()=>{
        if(imageRef.current.files[0]){
            if(imageRef.current.files[0]?.type.includes("image")){
                const imageUrl =  URL.createObjectURL(imageRef.current.files[0]);
                setImageUrl(imageUrl)
            } else  if(imageRef.current.files[0]?.type.includes("video")){
                const videoUrl =  URL.createObjectURL(imageRef.current.files[0]);
                setVideoUrl(videoUrl)
            } 
            
        }
      
    }
    const handleBlobClose=()=>{
        setImageUrl(null)
        setVideoUrl(null)
        imageRef.current.value = "";
    }
    const handleActivity =(el)=>{
        setActivity(`is ${el.symbol} feeling ${el.activity}.`)
        setActivityBoxVisibility(false)
    }
    const handleNewPost=()=>{
            setPostState(1)
            if(imageRef.current?.files[0]?.name){
                if(imageRef.current?.files[0]?.type.includes("image")){
                    const uploadTask =  storage.ref(`postImages/${imageRef.current.files[0].name}`).put(imageRef.current.files[0])

                    uploadTask.on("state_changed",
                    snapshot =>{
                        setPostState(Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)+1)
                    },
                    error=>{
    
                    },
                    ()=>{
                        storage.ref("postImages")
                        .child(imageRef.current.files[0].name)
                        .getDownloadURL()
                        .then(url=>{
                            const payload ={
                                image : url,
                                imagePath : imageRef.current.files[0].name,
                                title ,
                                activity,
                                author : uid,
                                time : new Date()
                            }
                            database.collection("posts").add(payload)
                            .then(()=>{
                                imageRef.current.value = "";
                                setTitle("")
                                    setPostState(0)
                                    setPostModalVisibility(false)
                            })
                        })
                    })
                    } else if(imageRef.current?.files[0]?.type.includes("video")){
                    const uploadTask =  storage.ref(`postVideos/${imageRef.current.files[0].name}`).put(imageRef.current.files[0])

                    uploadTask.on("state_changed",
                    snapshot =>{
                            
                        setPostState(Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)+1)
                    },
                    error=>{
    
                    },
                    ()=>{
                        storage.ref("postVideos")
                        .child(imageRef.current.files[0].name)
                        .getDownloadURL()
                        .then(url=>{
                            console.log(url)
                            const payload ={
                                video : url,
                                videoPath : imageRef.current.files[0].name,
                                title ,
                                activity,
                                author : uid,
                                time : new Date()
                            }
                            database.collection("posts").add(payload)
                            .then(()=>{
                                imageRef.current.value = "";
                                setTitle("")
                                setPostState(0)
                                setPostModalVisibility(false)
                            })
                        })
                    })
                    } 
                }else if(title){
                    const payload ={
                        title ,
                        activity,
                        author : uid,
                        time : new Date()
                    }
                    database.collection("posts").add(payload)
                    .then(()=>{
                    setTitle("")
                    setTimeout(()=>{
                        setPostState(0)
                        setPostModalVisibility(false)
                    },1000)
                    })
            }
    }
    const handleEmoji=(emoji)=>{
        setTitle(title + emoji.native)
    }
    return (
        <div className="createNewPostModal"  onClick={()=>setPostModalVisibility(false)} >
            <div className="createNewPostContainer" onClick={(e)=>{e.stopPropagation();setActivityBoxVisibility(false)}}>
              {postState?<div className="newPostProgressContainer flexBox">
                    <div className="progressBox">
                        <h2>Posting</h2> <br />
                        <br />

                        <DisappearedLoading size="small"/>
                    </div>
                    <div className="progressBarBox">
                            <div className="progressBar" style={{width:`${postState}%`}}>
            
                            </div>
                    </div>
                </div>:null}

                    <div className="createNewPostHeader flexBox">
                        <div className="createNewPostTitle">
                            <p>Create post</p>
                        </div>
                        <div className="createNewPostCloseButton flexBox"  onClick={()=>setPostModalVisibility(false)}>
                             <CloseIcon/>
                        </div>
                    </div>
                    <div className="createNewPostUserImage flexBox">
                            <img  src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                        <div className="flexBox newPostUserDetails">
                            <p>{`${first_name || ""} ${last_name || ""} ${activity || ""}`} </p>
                            <div className="privacySelect flexBox">
                                    <FriendsIcon />
                                    <p>Friends</p>
                                    <DownArrowIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="createNewPostInput flexBox">
                       <div className="flexBox inputTextBox">
                        <textarea value={title} onChange={(e)=>setTitle(e.target.value)}  cols="30" rows={videoUrl||imageUrl?"1" : "5"} placeholder={`Whats on your mind, ${first_name || ""}?`}></textarea>
                            <div className="newPostEmojiMartContainer">
                                <EmojiIcon onClick={()=>setEmojiMartVisibility(!emojiMartVisibility)} />
                            {emojiMartVisibility && <div className="newPostEmojiMartBox">
                                    <EmojiMart handleEmoji={handleEmoji} />
                            </div>}
                               
                            </div> 
                        </div>
                    {imageUrl && <div className="blobImage">
                        <img src={imageUrl} alt="img" />
                        <div className="blobImageCloseButton flexBox" onClick={handleBlobClose}>
                        <CloseIcon />
                        </div>
                       
                    </div>}
                    {videoUrl && <div className="blobImage">
                        <video controls src={videoUrl}></video>
                        <div className="blobImageCloseButton flexBox" onClick={handleBlobClose}>
                        <CloseIcon />
                        </div>
                       
                    </div>}
                     
                        
                    </div>
                    <div className="newPostAdd flexBox">
                        <div className="newPostAddTitle">
                            <p>Add to your post</p>
                      
                        </div>
                        <div className="flexBox iconWrap">
                            <label htmlFor="image" className="flexBox">
                                <PhotosIcon /> 
                            </label>
                             
                             <input type="file" ref={imageRef} id="image" onChange={preview} style={{display:"none"}} />
                        </div>
                        <div className="flexBox iconWrap" onClick={(e)=>e.stopPropagation()}>
                             <EmojiIcon onClick={()=>setActivityBoxVisibility(!activityBoxVisibility)} /> 
                           {activityBoxVisibility && <div className="activityBox scroll flexBox">
                                 {activities.map(el=>(<div key={el.activity} className="flexBox activityList" onClick={()=>handleActivity(el)}>
                                        <p>{el.symbol}</p>  <small>{el.activity}</small>
                                 </div>))}
                             </div>}
                        </div>
                        
                    </div>
                    <div className="postButton">
                        <button onClick={handleNewPost}>Post</button>
                    </div>
            </div>

        </div>
    )
}

export default NewPostModal
