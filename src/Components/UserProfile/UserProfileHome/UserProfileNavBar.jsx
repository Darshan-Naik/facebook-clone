import React, { useRef, useState } from 'react';
import { ReactComponent as MessengerIcon } from "../../../Icons/message.svg";
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { ReactComponent as DownArrowIcon } from "../../../Icons/downArrow.svg";
import UserProfileNavLinkWrapper from "./UserProfileNavLinkWrapper";
import EditProfileDataModal from "../UserProfilePostsPage/EditProfileDataModal";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { database } from '../../../Firebase/firebase';
import NewPostModal from "../../NewPost/NewPostModal";
import { DisappearedLoading } from "react-loadingg";

const UserProfileNavBar = ({currentUser, refresh, alternativePath, userProfileDetails, userFriends}) => {
    const [userProfileNavBarState, setUserProfileNavBarState] = useState(true);
    const [userProfileMoreOptionsState, setUserProfileMoreOptionsState] = useState(false);
    const [editUserDetailsModalState, setEditUserDetailsModalState] = useState(false);
    const [messengerIsLoading, setMessengerIsLoading] = useState(false);
    const [postModalVisibility,setPostModalVisibility] = useState(false);

    const userProfileNavBarRef = useRef();
    
    const { uid } = useSelector(state => state.auth.user);
    const { friendRequests, sentRequests, friends } = useSelector(state => state.auth);
    const chatRooms = useSelector( state => state.app.chatRooms );

    const history = useHistory();
    
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

    const redirectToMessenger = () => {
        setMessengerIsLoading(true);
        const chatRoom = chatRooms.filter( el => el.authors.includes(userProfileDetails.uid) );
        if( chatRoom[0]?.chatID ) {
            history.push(`/messenger/${chatRoom[0].chatID}`)
        } else {
            const payload = {
                authors: [uid, userProfileDetails.uid]
            }
            database.collection('chatRooms').add(payload)
            .then((res) => {
                setMessengerIsLoading(false);
                history.push(`/messenger/${res.id}`)
            });
        }
    }

    const handleEditUserDetailsModal = () => {
        setEditUserDetailsModalState(!editUserDetailsModalState)
    }

    const handleAddFriend = () => {
        let time = new Date();

        database.collection('users').doc(currentUser).collection('friendRequests').doc(`${currentUser}${uid}`).set({ senderId: uid, time });
        database.collection('users').doc(uid).collection('sentRequests').doc(`${currentUser}${uid}`).set({ reciverId: currentUser, time });
        
        const payload = {
            author: uid,
            isRead: false,
            tag: `friend`,
            action: `sent you a friend request.`,
            time: new Date()
        }
        database.collection('users').doc(currentUser).collection('notifications').add(payload);
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

        const payload = {
            author: uid,
            isRead: false,
            tag: `friend`,
            action: `accepted your friend request.`,
            time: new Date()
        }
        database.collection('users').doc(currentUser).collection('notifications').add(payload);
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
                                <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/friends`} label="Posts" extraClass="hideUserProfileMenuItem" >
                                    <span className="userProfileNavMenuName">Friends</span>
                                    {
                                        userFriends.length > 0 && <span className="userProfileNavMenuFriendsCount">{userFriends.length}</span>
                                    }
                                </UserProfileNavLinkWrapper>
                                <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/photos`} extraClass="hideUserProfileMenuItem" >
                                    Photos
                                </UserProfileNavLinkWrapper>
                                <div className="userProfileMoreOptions">
                                    <div className="userProfileNavMenuNameBox" onClick={() => setUserProfileMoreOptionsState(!userProfileMoreOptionsState)}>
                                        <span className="userProfileNavMenuName">More</span>
                                        <DownArrowIcon />
                                    </div>
                                    {
                                        userProfileMoreOptionsState ? (
                                            <div className="userProfileMoreOptionsItemContainer flexBox" onClick={() => setUserProfileMoreOptionsState(false)}>
                                                <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`}>
                                                    <span className="userProfileNavMenuName MoreOptionsItemBox">Friends</span>
                                                    <span className="userProfileNavMenuFriendsCount">{userFriends.length}</span>
                                                </Link>
                                                <Link to={`${alternativePath}/${userProfileDetails.uid}/photos`}>Photos</Link>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="flexBox userProfileNavMenuContainer">
                                <div className="userProfileNavAfterScrollBox flexBox" onClick={handleScrollToTop}>
                                    <img className="userProfileNavAfterScrollProfileImage" src={ userProfileDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="profilePic"/>
                                    <span className="userProfileNavAfterScrollNamePlate">{`${userProfileDetails.first_name} ${userProfileDetails.last_name}`}</span>
                                </div>
                            </div>
                        )
                    }
                    <div className="flexBox">
                        {
                            currentUser === uid ? (
                                <React.Fragment>
                                    <div className="flexBox userProfileNavButton addToStoryContainer" onClick={() => setPostModalVisibility(true)}>
                                        <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/plus_icon.png'} alt="plus"/>
                                        <span>Add to Story</span>
                                    </div>
                                    <div className="editProfileContainer userProfileNavButton flexBox" onClick={handleEditUserDetailsModal}>
                                        <img className="userProfileNavButtonIcons" src={process.env.PUBLIC_URL + '/Images/edit_icon.png'} alt="edit"/>
                                        <span>Edit Profile</span>
                                    </div>
                                    <div className="userProfileNavDotsBox">
                                        <ThreeDots />
                                    </div>
                                    {
                                        editUserDetailsModalState && <EditProfileDataModal handleEditUserDetailsModal={handleEditUserDetailsModal} />
                                    }
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
                                            <React.Fragment>
                                                {
                                                    !messengerIsLoading ? (
                                                        <div className="editProfileContainer userProfileNavButton flexBox" onClick={redirectToMessenger}>
                                                            <MessengerIcon />
                                                            <span>Message</span>
                                                        </div>
                                                    ) : (
                                                        <div className="editProfileContainer userProfileNavButton flexBox messageLoading">
                                                            <DisappearedLoading color="#1877f2" size="small" style={{width: `40px`}} />
                                                        </div>
                                                    )
                                                }
                                            </React.Fragment>
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
                <div className="confirmFriendRequestContainer flexBox">
                    <div className="flexBox">
                        <img className="userProfileNavAfterScrollProfileImage" src={ userProfileDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="profilePic"/>
                        <h1 className="confirmFriendRequestHeading"> <span>{userProfileDetails.first_name}</span> sent you a friend request</h1>
                    </div>
                    <div className="flexBox">
                        <div className="userProfileNavButton addToStoryContainer confirmRequestColor" onClick={handleAcceptFriendRequest}>
                            Confirm Request
                        </div>
                        <div className="editProfileContainer userProfileNavButton" onClick={handleDeleteFriendRequest}>
                            Delete Request
                        </div>
                    </div>
                </div>
                )
            }
            {
                postModalVisibility && <NewPostModal setPostModalVisibility={setPostModalVisibility} />
            }
        </React.Fragment>
    )
}

export default UserProfileNavBar
