import React from 'react';
import { Link } from "react-router-dom";

function UserProfilePostsPageIntro({ studies = true, went = true, lives = true, from = true, relationship = true, joinedOn = true, alternativePath, currentUser, userProfileDetails }) {
    
    return (
        <div className="postsPageIntroMainContainer">
            {
                (studies || went || lives || from || relationship || joinedOn) && (
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
                )
            }
            <div className="postsPageUserDetailsContainer">
                <div className="flexBox postsPageFriendsNameBox">
                    <h1 className="postsPageUserDetailsNamePlate">Friends</h1>
                    <Link to={`${alternativePath}/${currentUser}/friends`} className="postsPageLinkToFriendsPage">See all Friends</Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePostsPageIntro
