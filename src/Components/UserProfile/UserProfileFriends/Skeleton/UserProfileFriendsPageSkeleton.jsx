import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';
import FriendsCardSkeleton from "./FriendsCardSkeleton";

function UserProfileFriendsPageSkeleton ({userFriends}) {
    
    const dark = useSelector( state => state.theme.dark );
    
    return (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"}>
            <div className="userFriendsPageMainContainer">
                <div className="userFriendsPageContainer">
                    <div className="flexBox userFriendsPageHeaderBox">
                        <h1 className="userFriendsPageHeaderTitle">
                            <Skeleton style={{marginTop: "8px", borderRadius: "50px"}} width="100px" />
                        </h1>
                    </div>
                    <div  className="flexBox friendsCardMainContainer">
                        {
                            userFriends.map( el => {
                                return (
                                    <div key={el.friendId} className="friendsCardMainBox">
                                        <FriendsCardSkeleton  />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default UserProfileFriendsPageSkeleton
