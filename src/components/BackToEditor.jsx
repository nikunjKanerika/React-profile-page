
import React from 'react';
import { Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

export default function BackToEditor() {
  const navigate = useNavigate();
  const handleBackClick = () =>{
    navigate('/');

}
  return (
    <div className='flex flex-row justify-between items-center p-4 shadow-md bg-gray-100'>
      <Button
        variant='outlined'
        size='small'
        style={{ textTransform: 'capitalize' }} 
        onClick={handleBackClick}
      >
        Back to Editor
      </Button>
      <div>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<ShareIcon />}
          style={{ textTransform: 'capitalize' }} 
        //   onClick={handleShareClick}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
