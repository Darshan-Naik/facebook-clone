import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';

function UserProfileNavBarSkeleton() {
    const dark = useSelector(state => state.theme.dark)
    return (
        <SkeletonTheme color={dark ? "#202020" : "#dadada"} highlightColor={dark ? "#444" : "#f3efef"}>
            <div className="userProfileNavBarContainer">
                <nav className="userProfileNav flexBox">
                    <div className="flexBox userProfileNavMenuContainer">
                        <Skeleton style={{ marginBottom: "6px", borderRadius: "50px", margin: "6px 15px" }} width={80} height={16} />
                        <Skeleton style={{ marginBottom: "6px", borderRadius: "50px", margin: "6px 15px" }} width={80} height={16} />
                        <Skeleton style={{ marginBottom: "6px", borderRadius: "50px", margin: "6px 15px" }} width={80} height={16} />
                    </div>
                </nav>
            </div>
        </SkeletonTheme>
    )
}

export default UserProfileNavBarSkeleton
