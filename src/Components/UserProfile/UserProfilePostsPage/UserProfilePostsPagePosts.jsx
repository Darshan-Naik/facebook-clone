import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PostCard from "../../PostCard/PostCard";
import NewPost from "../../NewPost/NewPost";
import { database } from '../../../Firebase/firebase';

function UserProfilePostsPagePosts({userProfileDetails}) {
    const [userPosts, setUserPosts] = useState([]);
    const [activePostId,setActivePostId]=React.useState(null);

    const { uid } = useSelector(state => state.auth.user, shallowEqual);

    useEffect(() => {
        const unsubscribe = database.collection('posts').where('author', "==", userProfileDetails.uid)
        .onSnapshot( res => {
            const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
            setUserPosts( newPosts );
        });

        return () => {
            unsubscribe();
        }

    }, [userProfileDetails])

    return (
        <div className="userPostsContainer scroll">
            {
                userProfileDetails.uid === uid && (
                    <div className="userPostsNewPostBox">
                        <NewPost />
                    </div>
                )
            }
            {
                userPosts.map( el => <PostCard {...el} activePostId={activePostId} setActivePostId={setActivePostId} key={el.id} /> )
            }
        </div>
    )
}

export default UserProfilePostsPagePosts
