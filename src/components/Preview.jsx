import React,{useContext, useState, useEffect} from 'react'
import { Button } from '@mui/material';
const BASE_URL = import.meta.env.VITE_BASE_URL;
function Preview() {

    const [totalUsers, setTotalUsers]  = useState([]);
    
    console.log(BASE_URL);
    useEffect( ()=>{

        async function fetchUsers (){
            try{
                const response = await fetch(`${BASE_URL}/api/v1/getUsers`);

                if(response.ok){
                    const {users} =  await response.json();
                    setTotalUsers(users);
                }
            }catch(error){
                console.log('Error while fetching users',error.message);
            }

        }
        fetchUsers()
    },[])
    return (
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 shadow-md bg-gray-200 p-4 '>
            {
                totalUsers?.map((user)=>(
                    <div key={user.firstName} className='shadow-md p-4 bg-white rounded-lg flex flex-col items-center'>
                        <img className='rounded-full w-24 h-24' src={user.profileImg} alt="profile-img" />
                        <div className='flex flex-col items-center mt-4'>
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className='mt-2 p-4 flex flex-col items-center '>
                            {   
                                
                                user.links?.map((link)=>(
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
                ))
            }
            
            
        </div>
        
    )
}

export default Preview
