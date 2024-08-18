import React,{useEffect, useState} from "react";
import profile from '../assets/profile.png'
import UserContext from "./UserContext";


const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState({
        firstName: 'Ben',
        lastName: 'Gupta',
        email: 'ben@example.com',
        profileImg: profile
    })
    const [linkItems, saveGlobalLinks] = useState(null)
    return(
        <UserContext.Provider value={{user,setUser,linkItems,saveGlobalLinks}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;