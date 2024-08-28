import React, { useState } from 'react';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';
import '../index.css'
export default function Navbar({setShowProfile}) {

  const navigate = useNavigate();

  const handlePreviewClick = () => {

    navigate('/preview'); 
  };

  return (
    <div className='flex flex-row justify-between items-center p-4 shadow-md bg-garay-100'>
      <h4 className='text-xl font-bold'>devLinks</h4>
      <div className='flex flex-row space-x-2'>
        <Button
          variant='outlined'
          size='small'
          startIcon={<LinkIcon />}
          style={{ textTransform: 'capitalize' }} 
          onClick={()=>{setShowProfile(false);}}
        >
          Links
        </Button>
        <Button
          variant='outlined'
          className=''
          size='small'
          startIcon={<PersonIcon />}
          style={{ textTransform: 'capitalize' }} 
          onClick={()=>{setShowProfile(true)}}
          
        >
          Profile Details
        </Button>
      </div>
      <div>
        <Button
          variant='outlined'
          color='primary'
          style={{ textTransform: 'capitalize' }} 
          onClick={handlePreviewClick}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
