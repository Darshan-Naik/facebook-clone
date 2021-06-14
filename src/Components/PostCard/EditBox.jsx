import React from 'react';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import {ReactComponent as FavIcon} from  "../../Icons/fav.svg";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';


function EditBox({handleEditSection, handleRemoveFav,id,handleFav,first_name,image,last_name,profilePic,title,handleEditPost,handleDeletePost,handleSetProfilePic,author,uid}) {
    const [editTitle,setEditTitle]=React.useState(title)
    const [editModal,setEditModal]=React.useState(false);
    const [deleteModal,setDeleteModal]=React.useState(false);

    const favorites = useSelector(store=>store.auth.favorites)

    const history = useHistory();
    
    const handleEditModal=()=>{
        handleEditSection();
        setEditModal(false)
    }
    const handleDelete =()=>{
        handleDeletePost();
        handleEditSection();
    }
    const handleCancel =()=>{
        handleEditSection();
        setDeleteModal(false);
    }
    const handleSetProfile=()=>{
        handleEditSection();
        handleSetProfilePic();
    }
    const handleFavorite=()=>{
        handleEditSection();
        handleFav();
    }
    const handleRemoveFavorite=()=>{
        handleRemoveFav(id);

    }
   
    return (
        <div className="editPostContainer">
            <div className="editPost flexBox" onClick={(e)=>e.stopPropagation()}>
                {author===uid?<>
                    <div className="editBox flexBox" onClick={()=>setEditModal(!editModal)}>
                        <img src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="editIcon" />
                        <p>Edit Post</p>
                    </div>
                    {image&&<div className="editBox flexBox" onClick={handleSetProfile}>
                        <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="setIcon" />
                        <p>Set as Profile Pic</p>
                    </div>}
                    <div className="editBox editPost1 flexBox" onClick={()=>setDeleteModal(true)}>
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
            </div>
            {editModal && <EditPostModal handleEditSection={handleEditSection} handleEditModal={handleEditModal} setEditTitle={setEditTitle} editTitle={editTitle} handleEditPost={handleEditPost} setEditModal={setEditModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title}/>}
            {deleteModal && <DeletePostModal handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </div>
    )
}

export default EditBox
