import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all feilds !")
    }

    try {
      const { data } = await axios.post("http://localhost:4000/api/users/login",
        { email, password, role }, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      );
      Cookies.set('jwt', JSON.stringify(data.token), { expires: 7 });
      toast.success("User Login successfully!");
      setIsAuthenticated(true)
      setTimeout(() => {
        navigate("/")
      }, 1500)
      setEmail("")
      setPassword("")
      setRole("")
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
              Cill<span className="text-blue-500">Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-5'>Login</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your email address' value={email} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Your password' value={password} className='w-full p-2 border rounded-md' />
            </div>
            <p className=' text-center mb-4'>New User ? <Link to={'/register'} className='text-blue-600'>Register Now</Link></p>
            <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login