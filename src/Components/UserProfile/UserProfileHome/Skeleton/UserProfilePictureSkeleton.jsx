import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';
import "../../../../Styles/UserProfile/UserProfile.css";

function UserProfilePictureSkeleton() {
    const dark = useSelector( state => state.theme.dark )
    return (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} >
            <div className="userProfilePictureContainer">
                <div className="userProfilePictureContainer userProfilePictureBox">
                    <div className="userProfilePicture" style={{ marginTop: "-3px"}}>
                        <Skeleton style={{borderRadius: "50%"}} height="100%" />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default UserProfilePictureSkeleton
