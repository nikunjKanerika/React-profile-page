import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { login } from '../../../service/api';



const Login = ({isUserAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      const body  = JSON.stringify({ email, password })
      const response = await login(body);
      console.log(response);
      if(response.ok){

        const data = await response.json();
        localStorage.setItem('token',data.token);
        isUserAuthenticated(true);
        navigate('/');
       
      }else{
         console.log('Error in logging in');
      }
    } catch (error) {
      console.log('Error in signup');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
        <button
              onClick={()=>navigate('/signup')}
              className="w-full px-4 py-2 font-bold text-black bg-gray-100 rounded-lg hover:bg-gray-500"
            >
              Create a new account
        </button>
      </div>
    </div>
  );
};

export default Login;
