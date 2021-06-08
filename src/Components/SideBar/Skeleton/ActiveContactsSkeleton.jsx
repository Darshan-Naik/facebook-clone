import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
function ActiveContactsSkeleton() {
    const dark = useSelector(store=>store.theme.dark)
    return (
            <SkeletonTheme width={200} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
                <div className="flexBox">
                    <Skeleton style={{margin:"0 5px"}} circle={true} height={35} width={35} />
                    <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                </div>
            </SkeletonTheme> 
    )
}

export default ActiveContactsSkeleton



