import React,{useState,useEffect} from "react";
import {BrowserRouter,Route,Routes,Outlet, Navigate} from 'react-router-dom';
import AddNewLinks from "./components/AddNewLinks";
import UserContextProvider from '../src/context/UserContextProvider'
import Preview from "./components/Preview";
import Home from './components/Home.jsx'
import Navbar from "./components/Navbar.jsx";
import BackToEditor from "./components/BackToEditor.jsx";
import SignUp from "./components/account/signup/Signup.jsx";
import Login from "./components/account/login/Login.jsx";

// const PrivateRoute = ({setShowProfile,setShowEditorBar,showEditorBar}) =>{
  
//     <>
//        {showEditorBar ? <BackToEditor setShowEditorBar={setShowEditorBar} /> : <Navbar setShowEditorBar={setShowEditorBar} setShowProfile={setShowProfile}/> }
//       <Outlet/>
//     </>
//     :<Navigate replace to = '/login'/>
// }
const App = ()=> {
  
  // const [showProfile,setShowProfile] = useState(true);
  // const [showEditorBar,setShowEditorBar] = useState(false);
  // const [isAuthenticated,isUserAuthenticated] = useState(false);

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login  /> } />
          <Route path="/signup" element={ <SignUp /> } />
           {/* <Route path='/' element={<PrivateRoute setShowProfile={setShowProfile} setShowEditorBar={setShowEditorBar} showEditorBar={showEditorBar}/>}> */}
            <Route path="/" element={<Home />} />
            <Route path="/preview" element={ <Preview />}/>
           {/* </Route>  */}
        </Routes>
      </BrowserRouter>
      
    </UserContextProvider>
  )
}

export default App
