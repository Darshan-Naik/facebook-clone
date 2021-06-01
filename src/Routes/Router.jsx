import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import LoginPage from '../Components/Login/LoginPage';
import UserProfilePostsPage from "../Components/UserProfile/UserProfilePostsPage/UserProfilePostsPage";
import UserProfileAboutPage from "../Components/UserProfile/UserProfileAbout/UserProfileAboutPage";
import Chats from '../Components/Chats/Chats';
import SideBar from '../Components/SideBar/SideBar';
import Messenger from '../Components/Messenger/Messenger';
import { useSelector } from 'react-redux';

function Router() {
    const[refresh,setRefresh] = React.useState(true)
    const handleRefresh = ()=>{
        setRefresh(!refresh)
    }
    const isAuth = useSelector(store=>store.auth.isAuth)
    console.log(isAuth)
    return !isAuth? <LoginPage/> : (

        <>
         <NavBar refresh={refresh} handleRefresh={handleRefresh} />
            <Switch>
                <Route path="/messenger/:chatId" >
                   <Messenger handleRefresh={handleRefresh} />
                </Route>
               
                <Route path="/">
                <>           
                    <Chats />
                        <Switch>
                            <Route path="/" exact>
                            <Home />
                            </Route>
                            <Route path="/menu" exact>                           
                            <SideBar />
                            </Route>  
                            <Route path="/:user_name" exact>
                                 <UserProfilePostsPage forceRefresh={handleRefresh} />
                             </Route>
                            <Route path="/:user_name/about" exact>
                                <UserProfileAboutPage forceRefresh={handleRefresh} />
                            </Route>                        
                        </Switch>
                </>
                </Route>
                
            </Switch>
            </>
        
    )
}

export default Router
