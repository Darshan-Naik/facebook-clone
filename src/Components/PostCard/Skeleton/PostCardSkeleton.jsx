import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function PostCardSkeleton() {
    const dark = useSelector(store=>store.theme.dark)
    return (
        <SkeletonTheme width={676} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
            <div className="postCardHeadContainer flexBox">
                <div className="postCardHeadBox1" >
                    <Skeleton style={{margin:"0 5px"}} circle={true} height={35} width={35} />
                </div>
                <div className="postCardHeadBox2">
                    <div className="postCardActivity flexBox">
                        <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                        <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                    </div>
                    <div className="postCardHeadBox3 flexBox">
                        <Skeleton style={{margin:"0 5px"}} circle={true} height={35} width={35} />
                    </div>
                </div>
            </div>
            <div className="postCardImage">

            </div>
            <div className="postCardFooter flexBox">
                <div className="postCardFooterBox flexBox">
                    <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                </div>
                <div className="postCardFooterBox flexBox">
                    <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                </div>
                <div className="postCardFooterBox flexBox">
                <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                </div>

            </div>
        </SkeletonTheme> 
    )
}

export default PostCardSkeleton
