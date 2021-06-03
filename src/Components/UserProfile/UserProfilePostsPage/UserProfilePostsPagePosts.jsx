import React from 'react'
import { useSelector } from 'react-redux';
import PostCard from "../../PostCard/PostCard";
import NewPost from "../../NewPost/NewPost";

function UserProfilePostsPagePosts({userProfileDetails}) {
    
    const { posts } = useSelector(state => state.posts);
    const { uid } = useSelector(state => state.auth.user);

    return (
        <div className="userPostsContainer">
            <div>
                {
                    userProfileDetails.uid === uid && <NewPost />
                }
            </div>
            {
                posts.map( el => el.author === userProfileDetails.uid ? <PostCard {...el} key={el.id} /> : null )
            }
        </div>
    )
}

export default UserProfilePostsPagePosts
