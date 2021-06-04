import React, { useEffect, useState } from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import { useSelector } from 'react-redux';
import filterFriends from '../../Utils/filterFriends';
import StoryBox from './StoryBox';

function StoryContainer(){
    const posts = useSelector(store=>store.posts.posts);

    return (
        <div className="storyMainContainer flexBox">
            {posts.filter((el)=>el.image).filter((el,i)=>i<5).map((post)=><StoryBox key={post.id} {...post} />)}
        </div>
    )
}

export default StoryContainer;