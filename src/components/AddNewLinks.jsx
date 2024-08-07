import React, { useState, useContext } from 'react'
import { Button } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import UserContext from '../context/UserContext';
export default function AddNewLinks() {
  let [links, setLinks] = useState([]);
  const {linkItems,saveLinks} = useContext(UserContext);
  const createLink = () =>{
    let linkIndex = 0;
    if(links.length){
      linkIndex = links[links.length-1].id;
    }

    let newLink = { id: linkIndex+1, platform: '', url: '' };
    return newLink;
  }
  const addLink = () =>{
    const newLink = createLink();
    setLinks([...links,newLink])
    console.log(links);
  }
  const deleteLink = (i) =>{
    
    const newArray = links.filter(linkItem=>{
      return linkItem.id !== i
    })

    console.log(newArray);
    setLinks(newArray);
  
  }

  const handleLinkChange = (index, platform, value) => {
    // console.log(index,platform,value);
    const updatedLinks = links.map((link, i) =>
        i === index ? { ...link, [platform]: value } : link
    );
    setLinks(updatedLinks);
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(links){
        saveLinks(links);
        console.log(linkItems, 'Lllllllllllllllllllll');
    }else{
      alert('please fill details');
    }
  }
  return (
    <div className='flex flex-col space-y-8 p-4 bg-white-500 shadow-md rounded-lg'>
      <div>
        <h2 className='text-4xl font-bold'>Customize your links</h2>
        <p className='mt-2'>Add/edit/remove links and then share all your profiles with the world!</p>
      </div>
      <div className='w-full mt-8'>
        <Button 
          variant='outlined'
          className='w-full mt-6'
          style={{textTransform: 'capitalize'}}
          onClick={addLink}
          startIcon={<AddOutlinedIcon/>}
        >
          Add New Link
        </Button>
      </div>
      {
        links.map((link,index)=>(
          <div key={index} className='bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-row justify-between'>
                <div>Link#{link.id}</div>
                <Button 
                  variant='soft'
                  className='text-gray-100' 
                  style={{textTransform:'capitalize'}}
                  onClick={()=>deleteLink(link.id)}
                >
                  Remove
                </Button>
              </div>
              
              <div className='flex flex-col'>
                <label className='text-md'>Platform:</label>
                <select
                  className='p-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={link.platform}
                  onChange={(e)=>handleLinkChange(index, 'platform', e.target.value)}
                  required
                >
                  <option value="">Select a option</option>
                  <option value="Github">Github</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Youtube">Youtube</option>

                </select>
                <label className='text-md mt-4'>Link:</label>
                <input 
                  type="url"
                  className='p-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={(e) =>
                      handleLinkChange(index, 'url', e.target.value)
                  }
                  placeholder='ben@example.com'
                  required
                   
                />
              </div>
          </div>
        ))
      }
      <div 
        className='w-full md:w-1/6'>
          <Button 
            onClick={(e)=>handleSubmit(e)}
            className='w-full md:w-1/6' 
            variant='contained'
          >
            Save
          </Button>
      </div>
    </div>
  )
}
