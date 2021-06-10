import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function PostCardSkeleton() {
    const dark = useSelector(store=>store.theme.dark)
    return (
        <SkeletonTheme width={676} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
            <div className="postCardHeadContainer flexBox">
                <div className="postCardHeadBox1" style={{boxShadow:"none"}}>
                    <Skeleton style={{margin:"0 5px"}} circle={true} height={35} width={35} />
                </div>
                <div className="postCardHeadBox2">
                    <div className="postCardActivity ">
                        <div>
                            <Skeleton style={{borderRadius:"25px"}} width={90} height={10}/>
                        </div>
                        <div>
                            <Skeleton style={{borderRadius:"25px"}} width={100} height={10}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="postCardImage" style={{width:"676px",height:"120px"}}></div>
            <div className="postCardFooter flexBox" style={{border:"none",padding:"16px 0"}}>
                <Skeleton style={{borderRadius:"25px"}} width={80} height={10}/>
                <Skeleton style={{borderRadius:"25px"}} width={80} height={10}/>
                <Skeleton style={{borderRadius:"25px"}} width={80} height={10}/>
            </div>
        </SkeletonTheme> 
    )
}

export default PostCardSkeleton
