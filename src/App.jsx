import React,{useState} from "react";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import PhoneView from './components/PhoneView'
import AddNewLinks from "./components/AddNewLinks";
import UserContextProvider from '../src/context/UserContextProvider'
import Preview from "./components/Preview";
const App = ()=> {
  const [showProfile,setShowProfile] = useState(true);
  const [showPreview,setShowPreview] = useState(false);

  return (
    <UserContextProvider>
      <Navbar setShowProfile={setShowProfile} setShowPreview={setShowPreview} />
      { 
        !showPreview
        ?
        (
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <PhoneView />
            </div>
            <div className="w-full md:w-1/2 px-2">
              {showProfile ? <Profile /> : <AddNewLinks />}
            </div>
          </div>
        )
        :
        (
          <Preview/>
        )
      }
    </UserContextProvider>
  )
}

export default App
