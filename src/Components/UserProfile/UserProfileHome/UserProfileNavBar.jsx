import React, { useRef, useState } from 'react';
import { ReactComponent as MessengerIcon } from "../../../Icons/message.svg";
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { ReactComponent as DownArrowIcon } from "../../../Icons/downArrow.svg";
import UserProfileNavLinkWrapper from "./UserProfileNavLinkWrapper";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { database } from '../../../Firebase/firebase';

const UserProfileNavBar = ({currentUser, refresh, alternativePath, userProfileDetails, userFriends}) => {
    const [userProfileNavBarState, setUserProfileNavBarState] = useState(true);
    const [userProfileMoreOptionsState, setUserProfileMoreOptionsState] = useState(false);

    const userProfileNavBarRef = useRef();
    
    const { uid } = useSelector(state => state.auth.user);
    const { friendRequests, sentRequests, friends } = useSelector(state => state.auth);

    window.addEventListener('scroll', function() {
        const position = userProfileNavBarRef.current?.getBoundingClientRect()
        if( position?.top >= 47 ) {
            setUserProfileNavBarState && setUserProfileNavBarState(true);
        } else {
            setUserProfileNavBarState && setUserProfileNavBarState(false);
        }
    })

    const handleScrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleAddFriend = () => {
        let time = new Date();

        database.collection('users').doc(currentUser).collection('friendRequests').doc(`${currentUser}${uid}`).set({ senderId: uid, time });
        database.collection('users').doc(uid).collection('sentRequests').doc(`${currentUser}${uid}`).set({ reciverId: currentUser, time });
    }
    
    const handleCancleRequest = () => {
        database.collection('users').doc(currentUser).collection('friendRequests').doc(`${currentUser}${uid}`).delete();
        database.collection('users').doc(uid).collection('sentRequests').doc(`${currentUser}${uid}`).delete();
    }

    const handleAcceptFriendRequest = () => {
        let time = new Date();

        database.collection('users').doc(currentUser).collection('friends').add({ friendId: uid, time });
        database.collection('users').doc(uid).collection('friends').add({ friendId: currentUser, time });
        database.collection('users').doc(currentUser).collection('sentRequests').doc(`${uid}${currentUser}`).delete();
        database.collection('users').doc(uid).collection('friendRequests').doc(`${uid}${currentUser}`).delete();
    }

    const handleDeleteFriendRequest = () => {
        console.log("calling");
        database.collection('users').doc(currentUser).collection('sentRequests').doc(`${uid}${currentUser}`).delete();
        database.collection('users').doc(uid).collection('friendRequests').doc(`${uid}${currentUser}`).delete();
    }

    return (
        <React.Fragment>

        <div className="userProfileNavBarContainer" style={currentUser === uid ? {paddingTop: `8px`} : {padding: `none`}} ref={userProfileNavBarRef}>
            <nav className="userProfileNav flexBox">
                {
                    userProfileNavBarState ? (
                        <div className="flexBox userProfileNavMenuContainer">
                            <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}`} >
                                Posts
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/about`} extraClass="hideUserProfileMenuItem" >
                                About
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/friends`} label="Posts" extraClass="hideUserProfileMenuItem" >
                                <span className="userProfileNavMenuName">Friends</span>
                                {
                                    userFriends.length > 0 && <span className="userProfileNavMenuFriendsCount">{userFriends.length}</span>
                                }
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/photos`} extraClass="hideUserProfileMenuItem" >
                                Photos
                            </UserProfileNavLinkWrapper>
                            {
                                currentUser === uid ? ( 
                                    <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/archive`} extraClass="hideUserProfileMenuItem" >
                                        Story Archive
                                    </UserProfileNavLinkWrapper>
                                ) : (
                                    <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/videos`} extraClass="hideUserProfileMenuItem" >
                                        Videos
                                    </UserProfileNavLinkWrapper> 
                                ) 
                            }
                            <div className="userProfileMoreOptions">
                                <div className="userProfileNavMenuNameBox" onClick={() => setUserProfileMoreOptionsState(!userProfileMoreOptionsState)}>
                                    <span className="userProfileNavMenuName">More</span>
                                    <DownArrowIcon />
                                </div>
                                {
                                    userProfileMoreOptionsState ? (
                                        <div className="userProfileMoreOptionsItemContainer flexBox" onClick={() => setUserProfileMoreOptionsState(false)}>
                                            <Link to={`${alternativePath}/${userProfileDetails.uid}/about`}>About</Link>
                                            <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`}>
                                                <span className="userProfileNavMenuName MoreOptionsItemBox">Friends</span>
                                                <span className="userProfileNavMenuFriendsCount">1000</span>
                                            </Link>
                                            <Link to={`${alternativePath}/${userProfileDetails.uid}/photos`}>Photos</Link>
                                            {
                                                currentUser === uid ? ( 
                                                    <Link to={`${alternativePath}/${userProfileDetails.uid}/archive`} >
                                                        Story Archive
                                                    </Link>
                                                ) : (
                                                    <Link to={`${alternativePath}/${userProfileDetails.uid}/videos`} >
                                                        Videos
                                                    </Link> 
                                                ) 
                                            }
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="flexBox userProfileNavMenuContainer">
                            <div className="userProfileNavAfterScrollBox flexBox" onClick={handleScrollToTop}>
                                <img className="userProfileNavAfterScrollProfileImage" src={process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt=""/>
                                <span className="userProfileNavAfterScrollNamePlate">{`${userProfileDetails.first_name} ${userProfileDetails.last_name}`}</span>
                            </div>
                        </div>
                    )
                }
                <div className="flexBox">
                    {
                        currentUser === uid ? (
                            <React.Fragment>
                                <div className="flexBox userProfileNavButton addToStoryContainer">
                                    <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="plus"/>
                                    <span>Add to Story</span>
                                </div>
                                <div className="editProfileContainer userProfileNavButton flexBox">
                                    <img className="userProfileNavButtonIcons" src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="edit"/>
                                    <span>Edit Profile</span>
                                </div>
                                <div className="userProfileNavDotsBox">
                                    <ThreeDots />
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {
                                    JSON.stringify(friendRequests).includes(currentUser) ? (
                                        null
                                    ) : JSON.stringify(sentRequests).includes(currentUser) ? (
                                        <div className="flexBox userProfileNavButton addToStoryContainer" onClick={handleCancleRequest}>
                                            <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/cancle_request_icon.png'} alt="plus"/>
                                            <span>Cancle Request</span>
                                        </div>
                                    ) : JSON.stringify(friends).includes(currentUser) ? (
                                        <div className="editProfileContainer userProfileNavButton flexBox">
                                            <MessengerIcon />
                                            <span>Message</span>
                                        </div>
                                    ) : (
                                        <div className="flexBox userProfileNavButton addToStoryContainer" onClick={handleAddFriend}>
                                            <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/add_friend_icon.png'} alt="plus"/>
                                            <span>Add Friend</span>
                                        </div>
                                    )
                                }
                                <div className="userProfileNavDotsBox">
                                    <ThreeDots />
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </nav>
        </div>
        {
            JSON.stringify(friendRequests).includes(currentUser) && (  
            <div>
                <h1>{`${userProfileDetails.first_name} sent you a friend request`}</h1>
                <div>
                    <button onClick={handleAcceptFriendRequest}>Confirm Request</button>
                    <button onClick={handleDeleteFriendRequest}>Delete Request</button>
                </div>
            </div>
            )
        }
    </React.Fragment>
    )
}

export default UserProfileNavBar
