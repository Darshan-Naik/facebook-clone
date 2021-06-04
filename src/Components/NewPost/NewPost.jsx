import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import NewPostModal from './NewPostModal'

function NewPost() {
    const [postModalVisibility,setPostModalVisibility] = React.useState(false)
    const {first_name,profilePic,uid,last_name} = useSelector(store=>store.auth.user)
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

       {postModalVisibility && <NewPostModal  setPostModalVisibility={setPostModalVisibility}/>}
        </>
    )
}

export default NewPost
