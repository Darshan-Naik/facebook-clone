import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import NewPostModal from './NewPostModal'
import { useHistory } from 'react-router'
import useVisibility from '../../Hooks/useVisibility'

function NewPost() {
    const [postModal,togglePostModal] = useVisibility()
    const {first_name,profilePic,uid} = useSelector(store=>store.auth.user)
    const history = useHistory()
    return (
        <>
        <div className="newPostContainer">
            <div className="newPostUserImage flexBox">
                <img onClick={()=>history.push(`/profile/${uid}`)} src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                <div onClick={togglePostModal}>
                    <p>{`Whats on your mind, ${first_name || ""}?`} </p>
                </div>
            </div>
            <div className="newPostIcons flexBox">

                <div className="flexBox"  onClick={togglePostModal}>
                    <PhotosIcon /> 
                    <p>Photo/video</p>
                </div>
                <div className="flexBox"  onClick={togglePostModal}>
                    <EmojiIcon /> 
                    <p>Feeling/Activity</p>
                </div>
            </div>           
        </div>

       {postModal && <NewPostModal  togglePostModal={togglePostModal}/>}
        </>
    )
}

export default NewPost
