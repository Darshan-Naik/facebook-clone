import React, { useState } from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import StoryBox from './StoryBox';
import { database } from '../../Firebase/firebase';

function StoryContainer(){
    const [posts,setPosts] = React.useState([])

    const [lenStory, setLenStory] = useState(5);
    React.useEffect(()=>{
        const unsubscribe = database.collection("posts").where("image", "!=", "undefined").limit(5).onSnapshot(res=>{
            setPosts(res.docs.map(doc=>({id:doc.id,...doc.data()}))) 
        });
        return ()=>{
            unsubscribe&& unsubscribe()
        }
    },[])
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