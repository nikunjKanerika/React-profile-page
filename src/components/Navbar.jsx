import React, { useState } from 'react';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import '../index.css'
export default function Navbar({setShowProfile,setShowPreview}) {

  return (
    <div className='flex flex-row justify-between items-center p-4 shadow-md bg-garay-100'>
      <h4 className='text-xl font-bold'>devLinks</h4>
      <div className='flex flex-row space-x-2'>
        <Button
          variant='outlined'
          size='small'
          startIcon={<LinkIcon />}
          style={{ textTransform: 'capitalize' }} 
          onClick={()=>{setShowProfile(false); setShowPreview(false)}}
        >
          Links
        </Button>
        <Button
          variant='outlined'
          className=''
          size='small'
          startIcon={<PersonIcon />}
          style={{ textTransform: 'capitalize' }} 
          onClick={()=>{setShowProfile(true); setShowPreview(false)}}
          
        >
          Profile Details
        </Button>
      </div>
      <div>
        <Button
          variant='outlined'
          color='primary'
          style={{ textTransform: 'capitalize' }} 
          onClick={()=>setShowPreview(true)}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
