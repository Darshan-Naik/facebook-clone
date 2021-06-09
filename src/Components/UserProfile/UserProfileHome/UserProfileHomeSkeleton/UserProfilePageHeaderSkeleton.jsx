import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';
import "../../../../Styles/UserProfile/UserProfile.css";

function UserProfilePageHeaderSkeleton() {
    const dark = useSelector( state => state.theme.dark );

    return (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"}>
            <div className="userProfileContainer">
                <div className="userProfileCoverPageBox">
                    <div className="userProfileCoverPageOverlay">
                        <div className="userProfileCoverPhotoBox">
                            <Skeleton style={{borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px"}} width="100%" height="100%" />
                        </div>
                    </div>
                </div>
                <div className="userNameContainer">
                    <h1 className="userNamePlate">
                        <Skeleton style={{borderRadius: "50px"}} width={300} height={25} />
                    </h1>
                    <p className="userProfileBioContent"></p>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default UserProfilePageHeaderSkeleton
