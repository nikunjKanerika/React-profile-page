import React,{useEffect, useState} from "react";
import profile from '../assets/profile.png'
import UserContext from "./UserContext";


const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState({
    })
    const [linkItems, saveGlobalLinks] = useState([]);

    return(
        <UserContext.Provider value={{user,setUser,linkItems,saveGlobalLinks}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;