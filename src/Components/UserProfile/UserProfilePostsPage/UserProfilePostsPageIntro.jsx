import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";

function UserProfilePostsPageIntro({ studies, went, lives, from, relationship, joinedOn, alternativePath, userProfileDetails }) {

    const [editUserDetailsModalState, setEditUserDetailsModalState] = useState(false);

    const handleEditUserDetailsModal = () => {
        setEditUserDetailsModalState(!editUserDetailsModalState)
    }

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
                            <div className="postsPageEditUserDetialsBox">
                                <button onClick={handleEditUserDetailsModal}>Edit Details</button>
                            </div>
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
                                    </div>
                                </div>
                            )
                        }
                    </React.Fragment>
                )
            }
            <div className="postsPageUserDetailsContainer">
                <div className="flexBox postsPageFriendsNameBox">
                    <h1 className="postsPageUserDetailsNamePlate">Friends</h1>
                    <Link to={`${alternativePath}/${userProfileDetails.uid}/friends`} className="postsPageLinkToFriendsPage">See all Friends</Link>
                </div>
                <div>
                    Friends
                </div>
            </div>
        </div>
    )
}

export default UserProfilePostsPageIntro
