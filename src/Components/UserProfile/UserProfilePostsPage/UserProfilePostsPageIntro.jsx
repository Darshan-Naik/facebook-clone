import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import EditProfileDataModal from "./EditProfileDataModal";
import friendsList from '../../../Utils/friendsList';

function UserProfilePostsPageIntro({ education, lives, from, relationship, joinedOn, alternativePath, userProfileDetails, userFriends }) {

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
                    !userProfileDetails.education && !userProfileDetails.lives && !userProfileDetails.from && !userProfileDetails.relationship && userProfileDetails.uid !== uid ? null : (
                        <div className="postsPageUserDetailsContainer">
                            <h1 className="postsPageUserDetailsNamePlate">Intro</h1>
                            {
                                !userProfileDetails.education && !userProfileDetails.lives && !userProfileDetails.from && !userProfileDetails.relationship && userProfileDetails.uid === uid && (
                                    <p className="postsPageEditUserDetailsTag">Help people know about you...</p>
                                )
                            }
                            <div className="postsPageUserDetailsInfoBox flexBox">
                                {
                                    userProfileDetails.education && (
                                        <div  className="postsPageUserDetalisCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/studied_at_icon.png'} alt="studied"/>
                                            <span>{userProfileDetails.education}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.lives && (      
                                        <div  className="postsPageUserDetalisCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/lives_in_home_icon.png'} alt="home"/>
                                            <span>{userProfileDetails.lives}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.from && (
                                        <div  className="postsPageUserDetalisCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/location_icon.png'} alt="location"/>
                                            <span>{userProfileDetails.from}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.relationship && (
                                        <div className="postsPageUserDetialsCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/relationship_status_icon.png'} alt="relationship"/>
                                            <span>{userProfileDetails.relationship}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <React.Fragment>
                                {
                                    userProfileDetails.uid === uid && (
                                        <React.Fragment>
                                                <div className="postsPageEditUserDetialsBox">
                                                    <button onClick={handleEditUserDetailsModal}>Edit Details</button>
                                                </div>
                                            {
                                                editUserDetailsModalState && (
                                                    <React.Fragment>
                                                        <EditProfileDataModal handleEditUserDetailsModal={handleEditUserDetailsModal} />
                                                    </React.Fragment>
                                                )
                                            }
                                        </React.Fragment>
                                    )
                                }
                            </React.Fragment>
                        </div>
                    )  
                }
            {
                userFriends.length > 0 && (
                    <div className="postsPageUserDetailsContainer">
                        <div className="flexBox postsPageFriendsNameBox">
                            <h1 className="postsPageUserDetailsNamePlate">Friends</h1>
                            <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`} className="postsPageLinkToFriendsPage">See all Friends</Link>
                        </div>
                        <div className="postsPageFriendsCount">
                            <span>{userFriendsList.length}</span>
                            <span>
                                {
                                    userFriendsList.length > 1 ? ` friends` : ` friend`
                                }
                            </span>
                        </div>
                        <div className="flexBox postsPageUserFriendsContainer">
                            {
                                userFriendsList.map( el => {
                                    return (
                                        <div key={el.uid} className="flexBox postsPageUserFriendsBox">
                                            <Link className="postsPageUserFriendsLink" to={`/profile/${el.uid}`}>
                                                <img className="postsPageFriendsImage" src={el.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={`${el.first_name}`}/>
                                            </Link>
                                            <Link className="postsPageUserFriendsNamePlate" to={`/profile/${el.uid}`}>
                                                {`${el.first_name} ${el.last_name}`}
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfilePostsPageIntro
