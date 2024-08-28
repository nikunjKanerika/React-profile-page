import React,{useRef, useState, useContext, useEffect} from 'react'
import { Button } from '@mui/material'
import profile from '../assets/profile.png'
import UserContext from '../context/UserContext';
import { getUser,saveUser } from '../service/api';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Profile() {

    let [userDetails, setUserDetails] = useState({});

    let fileInputRef = useRef(null)

    const {user,setUser} = useContext(UserContext);
    
    useEffect(()=>{
        const fetchUser = async () =>{
          try {
                  const response = await getUser();
                  if (response.ok) {
                    const data = await response.json();
                    const user = data.user
                    const fetchedUser = {
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      profile_url: user.profile_url
                    }
                    setUser(fetchedUser);
                  } else {
                    console.error('Failed to fetch user links');
                  }
                } catch (error) {
                  console.error('Error:', error);
                }
        }
        fetchUser();
      },[])
    const handleChange = (e) => {
        setUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
       
    };

    const handleImageUpload = (e) =>{
        const file = e.target.files[0];
        console.log(file);
        if(file){

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                const base64dataImg = reader.result; 

                setUserDetails(prev => ({
                    ...prev,
                    profileImg: base64dataImg
                }));
            };
        }   

    }
    
    const handleImageClick = () =>{
        if( fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        setUser(userDetails);   
        const formData = new FormData(e.target);
       
        console.log(e);
        const file = fileInputRef.current.files[0];
        if (file) {
            formData.append('profileImg', file);
        }

        try {         
            const response = await saveUser(formData);   
            if (response.ok) {
                const data = await response.json();
                console.log('User saved successfully', data);
            } else {
                console.error('Failed to save user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div className='flex flex-col space-y-8 p-4 bg-white-500 shadow-md rounded-lg'>
        <div>
            <h2 className='text-4xl font-bold'>Profile details</h2>
            <p className='mt-2'>Add your details to create a personal touch to your profile</p>
        </div>
        <div className='flex flex-row justify-between items-center bg-gray-100 p-4 rounded-lg'>
            <div><p>Profile picture</p></div>
            <div className='relative w-24 h-24 rounded-full items-center cursor-pointer' onClick={handleImageClick}>
                <img 
                    name='profileImg'
                    onChange={(e)=>handleChange(e)} 
                    className='rounded-full w-24 h-24' 
                    src={user.profile_url} 
                    alt="profile-pic" 
                />
                <input
                    ref={fileInputRef}
                    className='hidden'
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                    required
                />
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white">Change Image</span>
                </div>
            </div>
            <div>Upload only png/jpg format</div>
        </div>
        <div className='flex flex-col  p-4 bg-gray-100 rounded-lg'>
            <form className='space-y-10' onSubmit={(e)=>handleSubmit(e)}>
                <div className='flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-20'>
                    <label htmlFor="first">First Name:*</label>
                    <input 
                        className='p-2 rounded-lg w-full border-2 border-gray-300 focus:outline-none focus:border-none  focus:ring-2 focus:ring-blue-500' 
                        id='first'
                        name='firstName'
                        onChange={(e)=>handleChange(e)}
                        value={user.firstName}
                        type="text" 
                        placeholder='Ben' 
                        required 
                    />
                </div>
                <div className='flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-20'>
                    <label htmlFor="">Last Name:*</label>
                    <input 
                        className='p-2 rounded-lg w-full border-2 border-gray-300 focus:outline-none focus:border-none  focus:ring-2 focus:ring-blue-500' 
                        name='lastName'
                        onChange={handleChange} 
                        type="text"  
                        value={user.lastName}
                        placeholder='Gupta' 
                        required
                    />
                </div>
                <div className='flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-24'>
                    <label htmlFor="">Email:*</label>
                    <input 
                        className='p-2 rounded-lg w-full border-2 border-gray-300 focus:outline-none focus:border-none  focus:ring-2 focus:ring-blue-500 ' 
                        name='email'
                        onChange={handleChange} 
                        type="email" 
                        value={user.email}
                        placeholder='Ben@example.com' 
                        required 
                    />
                </div>

                <Button
                    type='submit' 
                    className='w-full md:w-1/6'
                    variant='contained'
                >
                    Save
                </Button>
               
            </form>
        </div>
    </div>
  )
}
