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
import PopUp from '../../SharedComponents/PopUp'
import Compress from "react-image-file-resizer";
import useVisibility from '../../Hooks/useVisibility'

function NewPostModal({togglePostModal}) {
    const [title,setTitle] = React.useState("")
    const [activity,setActivity] = React.useState(null)
    const {first_name,profilePic,uid,last_name} = useSelector(store=>store.auth.user)
    const imageRef = React.useRef()
    const[postState,setPostState] = React.useState(0)
    const [imageUrl,setImageUrl] = React.useState()
    const [videoUrl,setVideoUrl] = React.useState()
    const [emojiMart,toggleEmojiMart,closeEmojiMart] = useVisibility()
    const [activityBox,toggleActivityBox,closeActivityBox] =  useVisibility()
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
        closeActivityBox()
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
                                    Compress.imageFileResizer(
                                        imageRef.current.files[0], // the file from input
                                        400, // width
                                        400, // height
                                        "JPEG", // compress format WEBP, JPEG, PNG
                                        70, // quality
                                        0, // rotation
                                        (uri) => {
                                   
                                        let file =  new File([uri],"thumb_"+imageRef.current.files[0].name, { lastModified: new Date().getTime(), type: uri.type })
                                        const uploadTask =  storage.ref(`postImages/${file.name}`).put(file)

                                                uploadTask.on("state_changed",
                                                snapshot =>{
                                                    
                                                },
                                                error=>{
                                
                                                },
                                                ()=>{
                                                    storage.ref("postImages")
                                                    .child(file.name)
                                                    .getDownloadURL()
                                                    .then(thumb_url=>{
                                                            const payload ={
                                                                        image : url,
                                                                        thumb_url,
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
                                                                            togglePostModal()
                                                                    })
                                                            })
                                                    },
                                                )
                                            
                                    
                                        
                                        },
                                        "blob" // blob or base64 default base64
                                            )
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
                                togglePostModal()
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
                        togglePostModal()
                    },1000)
                    })
            }
    }
    const handleEmoji=(emoji)=>{
        setTitle(title + emoji.native)
    }
    return (
        <div className="createNewPostModal"  onClick={togglePostModal} >
            <PopUp className="createNewPostContainer" onClick={()=>{closeEmojiMart();closeActivityBox()}}>
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
                        <div className="createNewPostCloseButton flexBox"  onClick={togglePostModal}>
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
                                <EmojiIcon onClick={toggleEmojiMart} />
                            {emojiMart && <PopUp className="newPostEmojiMartBox">
                                    <EmojiMart handleEmoji={handleEmoji} />
                            </PopUp>}
                               
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
                        <PopUp className="flexBox iconWrap" >
                             <EmojiIcon onClick={toggleActivityBox} /> 
                           {activityBox && <div className="activityBox scroll flexBox">
                                 {activities.map(el=>(<div key={el.activity} className="flexBox activityList" onClick={()=>handleActivity(el)}>
                                        <p>{el.symbol}</p>  <small>{el.activity}</small>
                                 </div>))}
                             </div>}
                        </PopUp>
                        
                    </div>
                    <div className="postButton">
                        <button onClick={handleNewPost}>Post</button>
                    </div>
            </PopUp>

        </div>
    )
}

export default NewPostModal
