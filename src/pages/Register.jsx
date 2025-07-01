import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Register() {
  const {isAuthenticated ,setIsAuthenticated}=useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  // const [education, setEducation] = useState('')
  const [photo, setPhoto] = useState('')
  const [photoPreview, setPreview] = useState('')

  const changePhotoHandler = (e)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload=()=>{
        setPreview(reader.result)
        setPhoto(file)
      }
  }

  const handleChange = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("password",password);
    formData.append("role",role);
    // formData.append("education",education);
    formData.append("photo",photo);
    try {
      const {data} = await axios.post("http://localhost:4000/api/users/register",
        formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );
      toast.success("User register successfully!");
      setIsAuthenticated(true)
      setName('')
      setEmail("");
      setPassword("")
      // setEducation("")
      setPhoto("")
      setRole("") 
      setPreview("")
      setPhone("")    
      setTimeout(() => {
        navigate('/')
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form onSubmit={handleChange}>
            <div className="font-semibold text-xl items-center text-center">
              Cill<span className="text-blue-500">Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-5'>Register</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Your name' value={name} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Your email address' value={email} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="number" onChange={(e)=>setPhone(e.target.value)} placeholder='Your phone number' value={phone} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Your password' value={password} className='w-full p-2 border rounded-md' />
            </div>
            {/* <select value={education} onChange={(e)=>setEducation(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
            </select> */}
            <div className="flex items-center mb-4">
              <div className="photo w-20 h-20 mr-4">
                <img src={photoPreview?`${photoPreview}`:"Photo"} alt="photo" />
              </div>
              <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
            </div>
            <p className=' text-center mb-4'>Already registered? <Link to={'/login'} className='text-blue-600'>Login Now</Link></p>
            <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register