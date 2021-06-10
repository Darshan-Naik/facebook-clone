import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';

function FriendsCardSkeleton() {

    const dark = useSelector( state => state.theme.dark )
    
    return (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"}>
            <div className="friendsCardBox flexBox">
                <div className="friendsProfilePicCover">
                    <Skeleton style={{borderRadius: "6px"}} width="100%" height="100%" />
                </div>
                <div className="friendsCardNamePlateBox" style={{flex: "1"}}>
                    <Skeleton style={{borderRadius: "50px"}} width="130px" />
                </div>
                <div className="friendsCardThreeDotsBox flexBox" style={{width: "20px", height: "20px"}}></div>
            </div>
        </SkeletonTheme>
    )
}

export default FriendsCardSkeleton
