const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken=()=>{
    return localStorage.getItem('token');
}
export const login = async (body) =>{
    
   const response = await fetch(`${BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
           'Authorization': `Bearer ${getToken()}`
        },
        body: body
      });
      return response;
}
export const signup = async ({firstName,lastName,email,password})=>{
    const response = await fetch(`${BASE_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
           'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({firstName,lastName,email,password})
      });
      return response;
}
export const getUser = async ()=>{
    const response = await fetch(`${BASE_URL}/api/v1/getUser`,{
        method: 'GET',
        headers:{
          'authorization': `Bearer ${getToken()}`
        }
      });

      return response;
}
export const getUsers = async ()=>{
    const response = await fetch(`${BASE_URL}/api/v1/getUsers`,{
        method: 'GET',
        headers:{
          'authorization': `Bearer ${getToken()}`
        }
      });

      return response;
}
export const delLink = async (id)=>{
    const response = await fetch(`${BASE_URL}/api/v1/deleteLink/${id}`,{
        method: 'DELETE',
        headers:{
          'authorization': `Bearer ${getToken()}`
        }
      });
    
      return response;
}
export const saveUserLinks = async (newAddedLinks)=>{
    const response = await fetch(`${BASE_URL}/api/v1/saveUserLinks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ userLinks:newAddedLinks }), // Send the links data as JSON
      });
      return response
}
export const getLinks = ()=>{

}
export const saveUser = async(formData)=>{
    const response = await fetch(`${BASE_URL}/api/v1/saveUser`, {
        method: 'PATCH',
        body: formData, 
        headers:{
            'authorization': `Bearer ${getToken()}`
        }
    });
}
