import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  // const [education, setEducation] = useState('')
  const [photo, setPhoto] = useState('')
  const [photoPreview, setPreview] = useState('')

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form action="">
            <div className="font-semibold text-xl items-center text-center">
              Cill<span className="text-blue-500">Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-5'>Register</h1>
            <select value={role} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="mb-4">
              <input type="text" placeholder='Your name' value={name} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="email" placeholder='Your email address' value={email} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="number" placeholder='Your phone number' value={phone} className='w-full p-2 border rounded-md' />
            </div>
            <div className="mb-4">
              <input type="password" placeholder='Your password' value={password} className='w-full p-2 border rounded-md' />
            </div>
            {/* <select value={education} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
            </select> */}
            <div className="flex items-center mb-4">
              <div className="photo w-20 h-20 mr-4">
                <img src="" alt="photo" />
              </div>
              <input type="file" className='w-full p-2 border rounded-md' />
            </div>
            <p className=' text-center mb-4'>Already registered? <Link className='text-blue-600'>Login Now</Link></p>
            <button className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register