import React,{useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
import UserContext from '../context/UserContext';
import { getUser } from '../service/api';
import BackToEditor from './BackToEditor';


const BASE_URL = import.meta.env.VITE_BASE_URL;
function Preview() {

    const {user,setUser,linkItems} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect( ()=>{

        async function fetchUsers (){
            try{
             
                const response = await getUser();

                if(response.ok){
                    const data =  await response.json();
                    setUser(data.user);
                }else if(response.status === 401){
                    navigate('/login');
                }else{
                    console.log('Failed to fetch users:', response.statusText);
                }
            }catch(error){
                console.log('Error while fetching users',error.message);
            }

        }
        fetchUsers();
    },[])
    return (
        <>
        <BackToEditor />
        <div className='mt-2 shadow-md justify-center h-full bg-gray-100 p-4 '>
           
                    <div className=' ml-auto mr-auto w-1/3 shadow-md p-4 bg-white rounded-lg flex flex-col items-center'>
                        <img className='rounded-full w-24 h-24' src={user.profile_url} alt="profile-img" />
                        <div className='flex flex-col items-center mt-4'>
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className='mt-2 p-4  items-center '>
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
            
            
        </div>
        </>
    )
}

export default Preview
