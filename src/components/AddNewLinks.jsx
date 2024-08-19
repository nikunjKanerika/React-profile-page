import React, { useState, useContext, useEffect } from 'react'
import { Button } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import UserContext from '../context/UserContext';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function AddNewLinks() {

  const [users, setUsers] = useState([]);
  let [userLinks, setUserLinks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const {setUser, saveGlobalLinks} = useContext(UserContext);

  const createLink = () =>{
    let linkIndex = 0;
    if(userLinks.length){
      linkIndex = userLinks.length;
    }

    let newLink = { id: linkIndex+1, platform: '', url: '' };
    return newLink;
  }

  const addLink = () =>{
    const newLink = createLink();
    setUserLinks([...userLinks,newLink])
  }

  const deleteLink = (i) =>{
    let newArray = userLinks.filter(linkItem=>{
      return linkItem.id !== i
    })

    for (let ind = 0; i < newArray.length; i++) {
      newArray[ind].id = ind + 1;
      console.log(newArray[ind]);
    }
    
    setUserLinks(newArray);
  }

  const handleLinkChange = (index, platform, value) => {
    const updatedLinks = userLinks.map((link, i) =>
        i === index ? { ...link, [platform]: value } : link
    );
    setUserLinks(updatedLinks);
  };

  //handle selected user
  const handleUserChange = async (e) => {
    const firstName = e.target.value;
    setSelectedUser(firstName);
    
    if (firstName) {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/getUser/${firstName}`);
        if (response.ok) {
          const data = await response.json();
          const fetchedUser = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            profileImg: data.user.profileImg
          }
          setUser(fetchedUser);
          setUserLinks(data.user.links);
          saveGlobalLinks(data.user.links);
        } else {
          console.error('Failed to fetch user links');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/getUsers`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users); // Adjust based on your API response structure
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUsers();
  }, []);

  // submitting user links
  const handleSubmit = async(e)=>{
    e.preventDefault();

    let isValid = true;
    userLinks.forEach(link => {
      if (!link.platform || !link.url) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill in all the required fields before saving.");
      return; 
    }


    try {
      const response = await fetch(`${BASE_URL}/api/v1/saveUserLinks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: selectedUser, userLinks }), // Send the links data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Links saved successfully', data);
        saveGlobalLinks(userLinks); 
        setUserLinks(userLinks);
      } else {
        console.error('Failed to save links');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='flex flex-col space-y-8 p-4 bg-white-500 shadow-md rounded-lg'>
      <div>
        <h2 className='text-4xl font-bold'>Customize your links</h2>
        <p className='mt-2'>Add/edit/remove links and then share all your profiles with the world!</p>
      </div>
      <div className='w-full mt-8'>
        <select
          className='p-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.firstName} value={user.firstName}>
              {user.firstName+' '+user.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className='w-full mt-8'>
        <Button 
          variant='outlined'
          className='w-full mt-6'
          style={{textTransform: 'capitalize'}}
          onClick={addLink}
          startIcon={<AddOutlinedIcon/>}
          disabled = { !selectedUser ? true : false}
        >
          Add New Link
        </Button>
      </div>
      {
        userLinks.length>0 && (
        userLinks.map((link,index)=>(
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
              
              <form className='flex flex-col'>
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
                  value={link.url}
                  onChange={(e) =>
                      handleLinkChange(index, 'url', e.target.value)
                  }
                  placeholder='ben@example.com'
                  required
                   
                />
              </form>
          </div>
        ))
      )
      }
      <div 
        className='w-full md:w-1/6'>
          <Button 
            onClick={(e)=>handleSubmit(e)}
            className='w-full md:w-1/6' 
            variant='contained'
            disabled = {!selectedUser ? true : false}
          >
            Save
          </Button>
      </div>
    </div>
  )
}
