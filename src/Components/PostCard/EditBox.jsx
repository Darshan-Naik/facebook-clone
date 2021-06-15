import React from 'react';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import {ReactComponent as FavIcon} from  "../../Icons/fav.svg";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PopUp from '../../SharedComponents/PopUp'
import useVisibility from '../../Hooks/useVisibility';


function EditBox({toggleEditSection, handleRemoveFav,id,handleFav,first_name,image,last_name,profilePic,title,handleEditPost,handleDeletePost,handleSetProfilePic,author,uid}) {
    const [editTitle,setEditTitle]=React.useState(title)
    const [editModal,toggleEditModal]= useVisibility();
    const [deleteModal,toggleDeleteModal]= useVisibility();

    const favorites = useSelector(store=>store.auth.favorites)

    const history = useHistory();
    
    const handleEditModal=()=>{
        toggleEditModal();
        toggleEditSection();
    }
    const handleDelete =()=>{
        handleDeletePost();
        toggleEditSection();
    }
    const handleCancel =()=>{
        toggleEditSection();
        toggleDeleteModal();
    }
    const handleSetProfile=()=>{
        toggleEditSection();
        handleSetProfilePic();
    }
    const handleFavorite=()=>{
        toggleEditSection();
        handleFav();
    }
    const handleRemoveFavorite=()=>{
        handleRemoveFav(id);
        toggleEditSection();

    }
    
    return (
        <div className="editPostContainer">
            <PopUp className="editPost flexBox" >
                {author===uid?<>
                    <div className="editBox flexBox" onClick={toggleEditModal}>
                        <img src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="editIcon" />
                        <p>Edit Post</p>
                    </div>
                    {image&&<div className="editBox flexBox" onClick={handleSetProfile}>
                        <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="setIcon" />
                        <p>Set as Profile Pic</p>
                    </div>}
                    <div className="editBox editPost1 flexBox" onClick={toggleDeleteModal}>
                        <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="removeIcon" />
                        <p>Delete Post</p>
                    </div>
                    {JSON.stringify(favorites).includes(id)?(<div className="editBox flexBox" onClick={handleRemoveFavorite}>
                        <FavIcon/>
                        <p>Remove from Favorites</p>
                    </div>)
                    :(<div className="editBox flexBox" onClick={handleFavorite}>
                        <FavIcon/>
                        <p>Add to Favorites</p>
                    </div>)}
                </>:<>
                    <div className="editBox flexBox" onClick={()=>history.push(`/profile/${author}`)}>
                        <ShareIcon/>
                        <p>View Profile</p>
                    </div>
                    {JSON.stringify(favorites).includes(id)?(<div className="editBox flexBox" onClick={handleRemoveFavorite}>
                        <FavIcon/>
                        <p>Remove from Favorites</p>
                    </div>)
                    :(<div className="editBox flexBox" onClick={handleFavorite}>
                        <FavIcon/>
                        <p>Add to Favorites</p>
                    </div>)}
                </>}
            </PopUp>
            {editModal && <EditPostModal toggleEditSection={toggleEditSection} handleEditModal={handleEditModal} setEditTitle={setEditTitle} editTitle={editTitle} handleEditPost={handleEditPost} toggleEditModal={toggleEditModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title}/>}
            {deleteModal && <DeletePostModal handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </div>
    )
}

export default EditBox
