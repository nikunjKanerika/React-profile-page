import React,{useContext} from 'react'
import UserContext from '../context/UserContext'
import { Button } from '@mui/material';
function Preview() {

    const {user,linkItems} = useContext(UserContext);
    

    return (
        
        <div className='flex flex-col justify-center items-center mt-20 w-60  mx-auto rounded-2xl shadow-md bg-white-200 '>
            <img className='rounded-full w-24 h-24' src={user.profileImg} alt="profile-img" />
            <div className='flex flex-col items-center mt-4'>
                <h4>{user.firstName}</h4>
                <p>{user.email}</p>
            </div>
            <div className='mt-2 p-4 flex flex-col items-center '>
                {   
                    
                    linkItems?.map((link)=>(
                        <div key={link.id} className="w-2/3 p-2">
                            <Button 
                                component='a' 
                                href={link.url} 
                                target='_blank'  
                                className='w-2/3 p-2'
                                variant='contained'
                                style={{textTransform:'capitalize'}}
                                >
                                {link.platform}
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
        
    )
}

export default Preview
