import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import friendsList from '../../../Utils/friendsList';

function UserProfilePostsPageIntro({ studies, went, lives, from, relationship, joinedOn, alternativePath, userProfileDetails, userFriends }) {

    const [editUserDetailsModalState, setEditUserDetailsModalState] = useState(false);
    const [userFriendsList, setUserFriendsList] = useState([])

    const { users } = useSelector( state => state.app );
    const { uid } = useSelector( state => state.auth.user );
    
    const handleEditUserDetailsModal = () => {
        setEditUserDetailsModalState(!editUserDetailsModalState)
    }

    useEffect(() => {
        setUserFriendsList( friendsList( users, userFriends ) )
    }, [users, userFriends])

    return (
        <div className="postsPageIntroMainContainer">
            {
                (userProfileDetails.studies || userProfileDetails.went || userProfileDetails.lives || userProfileDetails.from || userProfileDetails.relationship || userProfileDetails.joinedOn) ? (
                    <div className="postsPageUserDetailsContainer">
                        <h1 className="postsPageUserDetailsNamePlate">Intro</h1>
                        <div className="postsPageUserDetailsInfoBox flexBox">
                            {
                                studies && (
                                    <div  className="postsPageUserDetalisCoverBox">
                                        <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/studied_at_icon.png'} alt="studied"/>
                                        <span>Bingo International</span>
                                    </div>
                                )
                            }
                            {
                                lives && (      
                                    <div  className="postsPageUserDetalisCoverBox">
                                        <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/lives_in_home_icon.png'} alt="home"/>
                                        <span>Bingo International</span>
                                    </div>
                                )
                            }
                            {
                                from && (
                                    <div  className="postsPageUserDetalisCoverBox">
                                        <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/location_icon.png'} alt="location"/>
                                        <span>Bingo International</span>
                                    </div>
                                )
                            }
                            {
                                relationship && (
                                    <div className="postsPageUserDetialsCoverBox">
                                        <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/relationship_status_icon.png'} alt="relationship"/>
                                        <span>relationship</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="postsPageUserDetailsContainer">
                            <h1 className="postsPageUserDetailsNamePlate">Intro</h1>
                            <p className="postsPageEditUserDetailsTag">Help people know about you...</p>
                            {
                                userProfileDetails.uid === uid && (
                                    <div className="postsPageEditUserDetialsBox">
                                        <button onClick={handleEditUserDetailsModal}>Edit Details</button>
                                    </div>
                                )
                            }
                        </div>
                        {
                            editUserDetailsModalState && (
                                <div className="postsPageEditUserDetailsModalContainer">
                                    <div className="postsPageEditUserDetailsModalBox">
                                        <div className="postsPageEditUserDetailsModalHeader flexBox">
                                            <h1 className="postsPageEditDetailsModalHeaderNamePlate">Edit Details</h1>
                                            <div className="editUserDetailsModalCloseIconBox flexBox"  onClick={handleEditUserDetailsModal}>
                                                <CloseIcon />
                                            </div>
                                        </div>
                                        <div className="profilePicPreviewContainer">
                                            <div className="profilePicPreviewNoteBox flexBox">
                                                <form className="flexBox">
                                                    <div>
                                                        <input type="text" placeholder="name"/>
                                                    </div>
                                                    <input type="text" placeholder="name"/>
                                                    <input type="text" placeholder="name"/>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="chooseProfilePicInputContainer flexBox">
                                            <div className="chooseProfilePicInputBox">
                                                <input type="file" />
                                            </div>
                                            <div className="userProfilePicEditOptionsBox">
                                                <button>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </React.Fragment>
                )
            }
            {
                userFriends.length > 0 && (
                    <div className="postsPageUserDetailsContainer">
                        <div className="flexBox postsPageFriendsNameBox">
                            <h1 className="postsPageUserDetailsNamePlate">Friends</h1>
                            <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`} className="postsPageLinkToFriendsPage">See all Friends</Link>
                        </div>
                        <div className="flexBox postsPageUserFriendsContainer">
                            {
                                userFriendsList.map( el => {
                                    return (
                                        <div key={el.uid} className="postsPageUserFriendsBox">
                                            <Link to={`/profile/${el.uid}`}>
                                                <img className="postsPageFriendsImage" src={el.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={`${el.first_name}`}/>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="postsPageUserFriendsBox">
                                <Link to={``}>
                                    <img className="postsPageFriendsImage" src={process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={`hi`}/>
                                </Link>
                            </div>
                            <div className="postsPageUserFriendsBox">
                                <Link to={``}>
                                    <img className="postsPageFriendsImage" src={process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={`hi`}/>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfilePostsPageIntro
