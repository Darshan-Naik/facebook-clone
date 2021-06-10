import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
function StoryContainerSkeleton() {
    const dark = useSelector(store=>store.theme.dark)
    return (
            <SkeletonTheme width={130} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
                <div className="flexBox">
                    <Skeleton style={{borderRadius:"20px", margin: "10px 12px 10px 12px"}} width={110} height={170}/>
                </div>
            </SkeletonTheme> 
    )
}

export default StoryContainerSkeleton