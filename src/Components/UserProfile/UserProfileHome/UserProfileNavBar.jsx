import React, { useRef, useState } from 'react';
import { ReactComponent as MessengerIcon } from "../../../Icons/message.svg";
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { ReactComponent as DownArrowIcon } from "../../../Icons/downArrow.svg";
import UserProfileNavLinkWrapper from "./UserProfileNavLinkWrapper";

const UserProfileNavBar = ({currentUser = true}) => {
    const [navBarState, setNavBarState] = useState(false);

    const userProfileNavBarRef = useRef();
    window.addEventListener('scroll', function() {
        const position = userProfileNavBarRef.current?.getBoundingClientRect()
        if( position?.top >= 45 ) {
            setNavBarState(true);
        } else {
            setNavBarState(false);
        }
    })
    return (
        <div className="userProfileNavBarContainer" style={currentUser ? {paddingTop: `8px`} : {padding: `none`}} ref={userProfileNavBarRef}>
            <nav className="userProfileNav flexBox">
                {
                    navBarState ? (
                        <div className="flexBox userProfileNavMenuContainer">
                            <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}`} >
                                Posts
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}/about`} >
                                About
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}/friends`} label="Posts">
                                <span className="userProfileNavMenuName">Friends</span>
                                <span className="userProfileNavMenuFriendsCount">1000</span>
                            </UserProfileNavLinkWrapper>
                            <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}/photos`} >
                                Photos
                            </UserProfileNavLinkWrapper>
                            {
                                currentUser ? ( 
                                    <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}/archive`} >
                                        Story Archive
                                    </UserProfileNavLinkWrapper>
                                ) : (
                                    <UserProfileNavLinkWrapper path={`/${'Darshan Naik'}/videos`} >
                                        Videos
                                    </UserProfileNavLinkWrapper> 
                                ) 
                            }
                            <div className="userProfileNavMenuNameBox">
                                <span className="userProfileNavMenuName">More</span>
                                <DownArrowIcon />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>hello</h1>
                        </div>
                    )
                }
                <div className="flexBox">
                    {
                        currentUser ? (
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
                                    <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/addFriend_icon.png'} alt="plus"/>
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
