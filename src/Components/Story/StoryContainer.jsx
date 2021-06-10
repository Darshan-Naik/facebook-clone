import React, { useEffect, useState } from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import { useSelector } from 'react-redux';
import filterFriends from '../../Utils/filterFriends';
import StoryBox from './StoryBox';

function StoryContainer(){
    const posts = useSelector(store=>store.posts.posts);

    const [lenStory, setLenStory] = useState(5);

    function handleLength(){
        if(window.innerWidth>1210){
            setLenStory(5)
        } else if(window.innerWidth<1210 && window.innerWidth>600){
            setLenStory(4);
        } else if(window.innerWidth<600){
            setLenStory(3);
        }
    }

    window.addEventListener("resize", handleLength);
    React.useEffect(handleLength,[])

    return (
        <div className="storyMainContainer flexBox">
            {posts.filter((el)=>el.image).filter((el,i)=>(i<lenStory)).map((post)=><StoryBox key={post.id} {...post} />)}
        </div>
    )
}

export default StoryContainer;