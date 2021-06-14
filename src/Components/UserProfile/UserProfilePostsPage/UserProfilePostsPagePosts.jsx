import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PostCard from "../../PostCard/PostCard";
import NewPost from "../../NewPost/NewPost";
import { database } from '../../../Firebase/firebase';

function UserProfilePostsPagePosts({userProfileDetails}) {
    const [userPosts, setUserPosts] = useState([]);

    const { uid } = useSelector(state => state.auth.user);

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
                userPosts.map( el => <PostCard {...el} key={el.id} /> )
            }
        </div>
    )
}

export default UserProfilePostsPagePosts
