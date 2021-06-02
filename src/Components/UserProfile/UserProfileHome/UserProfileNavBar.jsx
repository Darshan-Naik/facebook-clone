import React, { useRef, useState } from 'react';
import { ReactComponent as MessengerIcon } from "../../../Icons/message.svg";
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { ReactComponent as DownArrowIcon } from "../../../Icons/downArrow.svg";
import UserProfileNavLinkWrapper from "./UserProfileNavLinkWrapper";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const UserProfileNavBar = ({currentUser, refresh, alternativePath, userProfileDetails}) => {
    const [userProfileNavBarState, setUserProfileNavBarState] = useState(true);
    const [userProfileMoreOptionsState, setUserProfileMoreOptionsState] = useState(false);

    const userProfileNavBarRef = useRef();
    
    const { first_name, last_name } = useSelector(state => state.auth.user);

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

    return (
        <div className="userProfileNavBarContainer" style={currentUser === `${first_name} ${last_name}` ? {paddingTop: `8px`} : {padding: `none`}} ref={userProfileNavBarRef}>
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
                                <span className="userProfileNavMenuFriendsCount">1000</span>
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`${alternativePath}/${userProfileDetails.uid}/photos`} extraClass="hideUserProfileMenuItem" >
                                Photos
                            </UserProfileNavLinkWrapper>
                            {
                                currentUser === `${first_name} ${last_name}` ? ( 
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
                                                currentUser === `${first_name} ${last_name}` ? ( 
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
                                <span className="userProfileNavAfterScrollNamePlate">{currentUser}</span>
                            </div>
                        </div>
                    )
                }
                <div className="flexBox">
                    {
                        currentUser === `${first_name} ${last_name}` ? (
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
                                <div className="flexBox userProfileNavButton addToStoryContainer">
                                    <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/add_friend_icon.png'} alt="plus"/>
                                    <span>Add Friend</span>
                                </div>
                                <div className="editProfileContainer userProfileNavButton flexBox">
                                    <MessengerIcon />
                                    <span>Message</span>
                                </div>
                                <div className="userProfileNavDotsBox">
                                    <ThreeDots />
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default UserProfileNavBar
