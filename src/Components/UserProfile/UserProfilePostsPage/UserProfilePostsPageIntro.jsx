import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import EditProfileDataModal from "./EditProfileDataModal";
import UserFriendCard from "./UserFriendsCard";
import PostPageFriendsSkeleton from "../UserProfileHome/Skeleton/PostPageFriendsSkeleton";

function UserProfilePostsPageIntro({ alternativePath, userProfileDetails, userFriends }) {

    const [editUserDetailsModalState, setEditUserDetailsModalState] = useState(false);
    
    const { uid } = useSelector( state => state.auth.user );
    
    const handleEditUserDetailsModal = (e) => {
        if( e ) {
            e.stopPropagation();
        }
        setEditUserDetailsModalState(!editUserDetailsModalState)
    }

    window.addEventListener('click', () => {
        setEditUserDetailsModalState(false);
    });

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
                                        <div  className="postsPageUserDetailsCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/studied_at_icon.png'} alt="studied"/>
                                            <span>{userProfileDetails.education}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.lives && (      
                                        <div  className="postsPageUserDetailsCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/lives_in_home_icon.png'} alt="home"/>
                                            <span>{userProfileDetails.lives}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.from && (
                                        <div  className="postsPageUserDetailsCoverBox">
                                            <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/location_icon.png'} alt="location"/>
                                            <span>{userProfileDetails.from}</span>
                                        </div>
                                    )
                                }
                                {
                                    userProfileDetails.relationship && (
                                        <div className="postsPageUserDetailsCoverBox">
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
                                                <div className="postsPageEditUserDetailsBox">
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
                userFriends ? (
                    userFriends.length > 0 ? (
                        <div className="postsPageUserDetailsContainer">
                            <div className="flexBox postsPageFriendsNameBox">
                                <h1 className="postsPageUserDetailsNamePlate">Friends</h1>
                                <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`} className="postsPageLinkToFriendsPage">See all Friends</Link>
                            </div>
                            <div className="postsPageFriendsCount">
                                <span>{userFriends.length}</span>
                                <span>
                                    {
                                        userFriends.length > 1 ? ` friends` : ` friend`
                                    }
                                </span>
                            </div>
                            <div className="flexBox postsPageUserFriendsContainer">
                                {
                                    userFriends.map( (el, i) => {
                                        return i < 9 && (
                                            <UserFriendCard key={el.friendId} {...el} alternativePath={alternativePath} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="postsPageUserDetailsContainer">
                            <h1>No Friends to show</h1>
                        </div>
                    )
                ) : (
                    <React.Fragment>
                        <PostPageFriendsSkeleton userFriends={userFriends} />
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default UserProfilePostsPageIntro
