import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import {ReactComponent as FriendsIcon} from  "../../Icons/friends.svg"
import {ReactComponent as DownArrowIcon} from  "../../Icons/downArrow.svg"
import "../../Styles/NewPost/NewPost.css"
import { database, storage } from '../../Firebase/firebase'

function NewPost() {
    const [title,setTitle] = React.useState("")
    const[postState,setPostState] = React.useState(false)
    const [postModalVisibility,setPostModalVisibility] = React.useState(false)
    const {first_name,profilePic,uid,last_name} = useSelector(store=>store.auth.user)
    const imageRef = React.useRef()
    const [imageUrl,setImageUrl] = React.useState()

    const preview =()=>{
        if(imageRef.current.files[0]){
            const imageUrl =  URL.createObjectURL(imageRef.current.files[0]);
            console.log(imageUrl)
            setImageUrl(imageUrl)
        }
      
    }
    const handleBlobClose=()=>{
        setImageUrl(null)
        imageRef.current.value = "";
    }
    const handleNewPost=()=>{
        setPostState(true)
      const uploadTask =  storage.ref(`postImages/${imageRef.current.files[0].name}`).put(imageRef.current.files[0])

      uploadTask.on("state_changed",
      snapshot =>{

        console.log(snapshot)
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
                  author : uid,
                  time : new Date()
              }
              database.collection("posts").add(payload)
              .then(()=>{
                imageRef.current.value = "";
                setTitle("")
                setTimeout(()=>{
                    setPostState(false)
                    setPostModalVisibility(false)
                },1000)
              })
        })
      })
    }

    return (
        <>
        <div className="newPostContainer">
            <div className="newPostUserImage flexBox">
                <img  src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                <div onClick={()=>setPostModalVisibility(true)}>
                    <p>{`Whats on your mind, ${first_name || ""}?`} </p>
                </div>
            </div>
            <div className="newPostIcons flexBox">

                <div className="flexBox"  onClick={()=>setPostModalVisibility(true)}>
                    <PhotosIcon /> 
                    <p>Photo/video</p>
                </div>
                <div className="flexBox"  onClick={()=>setPostModalVisibility(true)}>
                    <EmojiIcon /> 
                    <p>Feeling/Activity</p>
                </div>
            </div>           
        </div>

       {postModalVisibility && <div className="createNewPostModal">
            <div className="createNewPostContainer">
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
                        <div>
                            <p>{`${first_name || ""} ${last_name || ""}`} </p>
                            <div className="privacySelect flexBox">
                                    <FriendsIcon />
                                    <p>Friends</p>
                                    <DownArrowIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="createNewPostInput flexBox">
                       <div className="flexBox inputTextBox">
                        <textarea value={title} onChange={(e)=>setTitle(e.target.value)}  cols="30" rows={imageUrl?"1" : "5"} placeholder={`Whats on your mind, ${first_name || ""}?`}></textarea>
                            <EmojiIcon />
                        </div>
                    {imageUrl && <div className="blobImage">
                        <img src={imageUrl} alt="img" />
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
                        <div className="flexBox iconWrap">
                             <EmojiIcon /> 
                        </div>
                        
                    </div>
                    <div className="postButton">
                        <button onClick={handleNewPost}>Post</button>
                    </div>
            </div>

        </div>}
        </>
    )
}

export default NewPost
