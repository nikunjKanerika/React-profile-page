import {React,useState} from "react"
import { Box, Grid } from "@mui/material"
import Profile from "./Profile"
import PhoneView from "./PhoneView"
import AddNewLinks from "./AddNewLinks"
import Navbar from "./Navbar"
const Home = () =>{
    const [showProfile,setShowProfile] = useState(true);
    return(
        <>
        <Navbar setShowProfile={setShowProfile}/>
        <Box>  
            <Grid container>
                <Grid item lg={6} sm={6} xs={12}>
                    <PhoneView />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    {
                        showProfile 
                        ? 
                        <Profile /> 
                        : 
                        <AddNewLinks />
                    }
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Home