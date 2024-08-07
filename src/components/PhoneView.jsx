import React,{useContext} from 'react';
import { Button } from '@mui/material';
import profileImg from '../assets/profile.png'
import UserContext from '../context/UserContext';
const PhoneView = () => {
    const {user,linkItems} = useContext(UserContext);

    return (
        <div className="mt-2 bg-white rounded-lg shadow-md flex flex-col items-center h-full md:h-full">
            <div className='w-72 mt-12 rounded-lg border-2 border-gray-500 space-y-4 flex justify-center p-4'>
                <div className='w-64 rounded-lg border-2 border-gray-300'>
                    <div className='mt-4 flex items-center justify-center'>
                        <img className='w-24 h-24 rounded-full' src={user.profileImg} alt="" />
                    </div>
                    <div className=' flex flex-col items-center'> 
                        <h4>{`${user.firstName} ${user.lastName}`}</h4>
                        <p>{user.email}</p>
                    </div>
                     {/* Links  */}
                    <div className='mt-4 flex flex-col items-center justify-center'>
                        {
                            linkItems?.map(link=>(
                                <div className=' flex flex-col mb-2 items-center'>
                                    <Button 
                                        component='a' 
                                        href={link.url} 
                                        target='_blank'  
                                        className='p-2'
                                        variant='contained'
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {link.platform}
                                    </Button>
                                </div>
                            ))
                        }
                        
                        <br />
                        
                    </div>
                </div>
            </div>                   
        </div>
    );
}

export default PhoneView;
