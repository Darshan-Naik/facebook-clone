import React from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import { useSelector } from 'react-redux';

function StoryContainer(){
    const posts = useSelector(store=>store.posts.posts);
    console.log(posts)
    return (
        <div className="storyMainContainer flexBox">
            {posts.map((post)=><img className="imageMainContainer" src={post.image} />)}
        </div>
    )
}

export default StoryContainer;