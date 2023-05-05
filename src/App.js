import "./App.css";
import Header from "./components/header/Header";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import Socialmedia from "./components/socialmedia/Socialmedia";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate()
  // token expires,so clean it on every refresh and reload--!
  // let token = localStorage.getItem("token")
  useEffect(()=>{
    // if(token){
      window.localStorage.clear();
      navigate(("/"))
    // }
  },[])
  
  return (
    <div className="App">
      <Socialmedia />
      <Header />
      <Router />
    </div>
  );
}

export default App;
