import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import LoginPage from '../Components/Login/LoginPage';
import UserProfileRouter from "./UserProfileRouter";
import Chats from '../Components/Chats/Chats';
import SideBar from '../Components/SideBar/SideBar';
import Messenger from '../Components/Messenger/Messenger';
import { useSelector } from 'react-redux';
import Videos from '../Components/Pages/Videos';

function Router() {
    const[refresh,setRefresh] = React.useState(true)
    const handleRefresh = ()=>{
        setRefresh(!refresh)
    }
    const isAuth = useSelector(store=>store.auth.isAuth)
    
    return !isAuth? <LoginPage/> : (

        <>
         <NavBar refresh={refresh} handleRefresh={handleRefresh} />
            <Switch>
                <Route path="/friends/profile">
                    <div className="flexBox" style={{flexDirection: `row`}}>  
                        <div style={{minWidth: `362px`}}>
                            <h1>SidBar Comes Here</h1>
                        </div>
                        <div style={{flex: `1`}}>
                            <UserProfileRouter path="/friends/profile" refresh={refresh} forceRefresh={handleRefresh} />
                        </div>
                    </div>
                </Route>
                <Route path="/profile/:userId">
                    <UserProfileRouter path="/profile" refresh={refresh} forceRefresh={handleRefresh} />
                </Route>
                <Route path="/messenger/:chatID" >
                   <Messenger handleRefresh={handleRefresh} />
                </Route>
                <Route path="/">
                <>           
                    <Chats />
                    <Switch>
                        <Route path="/" exact>
                            <Home  handleRefresh={handleRefresh}/>
                        </Route>
                        <Route path="/videos" exact>
                            <Videos handleRefresh={handleRefresh} />
                        </Route>
                        <Route path="/menu" exact>                            
                            <SideBar />
                        </Route>            
                    </Switch>
                </>
                </Route>
            </Switch>
            </>
        
    )
}

export default Router
