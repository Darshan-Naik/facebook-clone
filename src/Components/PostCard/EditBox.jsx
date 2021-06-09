import React from 'react';
import EditPostModal from './EditPostModal';


function EditBox({first_name,image,last_name,profilePic,title,handleEditPost,handleDeletePost,handleSetProfilePic}) {
    const [editTitle,setEditTitle]=React.useState(title)
    const [editModal,setEditModal]=React.useState(false);
    
   
    return (
        <div className="editPostContainer">
            <div className="editPost flexBox">
                <div className="editBox flexBox" onClick={()=>setEditModal(!editModal)}>
                    <img src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="editIcon" />
                    <p>Edit Post</p>
                </div>
                {image&&<div className="editBox flexBox" onClick={handleSetProfilePic}>
                <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="setIcon" />
                    <p>Set as Profile Pic</p>
                </div>}
                <div className="editBox editPost1 flexBox" onClick={handleDeletePost}>
                    <img src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="removeIcon" />
                    <p>Delete Post</p>
                </div>
            </div>
           {editModal && <EditPostModal editModal={editModal} setEditModal={setEditModal} setEditTitle={setEditTitle} editTitle={editTitle} handleEditPost={handleEditPost} setEditModal={setEditModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title}/>}
            
        </div>
    )
}

export default EditBox
