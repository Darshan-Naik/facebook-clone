import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';
import "../../../../Styles/UserProfile/UserProfile.css";

function PostPageFriendsSkeleton({ userFriends }) {

    const dark = useSelector(state => state.theme.dark);

    return (
        <SkeletonTheme color={dark ? "#202020" : "#dadada"} highlightColor={dark ? "#444" : "#f3efef"}>
            <div className="postsPageUserDetailsContainer">
                <div className="flexBox postsPageFriendsNameBox">
                    <h1 className="postsPageUserDetailsNamePlate">
                        <Skeleton style={{ borderRadius: "50px", marginTop: "10px" }} width={100} />
                    </h1>
                </div>
                <div className="postsPageFriendsCount"></div>
                <div className="flexBox postsPageUserFriendsContainer">
                    {
                        userFriends.map((el, i) => {
                            return i < 9 && (
                                <div key={el.friendId} className="flexBox postsPageUserFriendsBox">
                                    <div className="postsPageUserFriendsLink">
                                        <Skeleton style={{ borderRadius: "6px" }} width="100%" height="100%" />
                                    </div>
                                    <div className="postsPageUserFriendsNamePlate"></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default PostPageFriendsSkeleton
