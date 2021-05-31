import React from "react"
import { useSelector } from "react-redux";
import './App.css';
import Router from "./Routes/Router";

function App() {

  const root = document.querySelector(':root');
  const dark = useSelector(store=>store.theme.dark)

  React.useEffect(()=>{
    if(dark){
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  },[dark,root])
  
 
  
  return (
    <div className="App">
        <Router/>
    </div>
  );
}

export default App;
