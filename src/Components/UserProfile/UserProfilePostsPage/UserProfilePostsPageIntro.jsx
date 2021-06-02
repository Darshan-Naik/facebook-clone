import React from 'react'

function UserProfilePostsPageIntro({ studies = true, went = true, lives = true, from = true, relationship = true, joinedOn = true }) {
    return (
        <div className="postsPageIntroMainContainer">
            {
                (studies || went || lives || from || relationship || joinedOn) && (
                    <div className="postsPageUserDetailsContainer">
                        <h1 className="postsPageUserDetailsNamePlate">Intro</h1>
                        <div className="postsPageUserDetailsInfoBox flexBox">
                            <div className="postsPageUserDetalisCoverBox">
                                <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/studied_at_icon.png'} alt="studied"/>
                                <span>Bingo International</span>
                            </div>
                            <div  className="postsPageUserDetalisCoverBox">
                                <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/studied_at_icon.png'} alt="studied"/>
                                <span>Bingo International</span>
                            </div>
                            <div  className="postsPageUserDetalisCoverBox">
                                <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/lives_in_home_icon.png'} alt="home"/>
                                <span>Bingo International</span>
                            </div>
                            <div  className="postsPageUserDetalisCoverBox">
                                <img className="postsPageUserDetailsInfoIcon" src={process.env.PUBLIC_URL + '/Images/location_icon.png'} alt="location"/>
                                <span>Bingo International</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfilePostsPageIntro
