import React from 'react'
import NavBar from '../Components/NavBar/NavBar';
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import LoginPage from '../Components/Login/LoginPage';
import Chats from '../Components/Chats/Chats';
import SideBar from '../Components/SideBar/SideBar';
import Messenger from '../Components/Messenger/Messenger';

function Router() {
    const[refresh,setRefresh] = React.useState(true)
    const handleRefresh = ()=>{
        setRefresh(!refresh)
    }
    return (

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
                            <Route path="/login" exact>
                            <LoginPage />
                            </Route>                           
                        </Switch>
                </>
                </Route>
            </Switch>
            </>
        
    )
}

export default Router
