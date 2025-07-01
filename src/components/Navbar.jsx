import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:4000/api/users/logout", { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("User logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };


  return (
    <>
      <nav className='shadow-lg px-4 py-2'>
        <div className="flex justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Cill<span className="text-blue-500">Blog</span>
          </div>
          {/* deshktop */}
          <div className='mx-6'>
            <ul className="hidden md:flex items-center space-x-6">
              <Link to="/" className='hover:text-blue-500'>HOME</Link>
              <Link to="/blog" className='hover:text-blue-500'>BLOGS</Link>
              <Link to="/creaters" className='hover:text-blue-500'>CREATERS</Link>
              <Link to="/about" className='hover:text-blue-500'>ABOUT</Link>
              <Link to="/contact" className='hover:text-blue-500'>CONTACT</Link>
            </ul>
            <div className='md:hidden' onClick={() => setShow(!show)}>{show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}</div>
          </div>
          <div className="space-x-2 flex">
            {isAuthenticated && profile?.role === "admin" ? (
              <Link to="/dashboard" className='bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded'>DASHBOARD</Link>
            ) : ("")}
            {!isAuthenticated?(
              <Link to="/login" className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>LOGIN</Link>
            ):(
              <div>
              <button onClick={handleLogout} className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>LOGOUT</button>  
              </div>
            )}
          </div>
        </div>
        {/* mobile */}
        {show && (
          <div className='bg-white'>
            <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
              <Link to="/" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>HOME</Link>
              <Link to="/blog" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>BLOGS</Link>
              <Link to="/creaters" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CREATERS</Link>
              <Link to="/about" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>ABOUT</Link>
              <Link to="/contact" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CONTACT</Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar