import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CiMenuBurger } from 'react-icons/ci';
import { BiSolidLeftArrowAlt } from 'react-icons/bi';

function Sidebar({ setComponent }) {
  const navigate = useNavigate();
  const { profile, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); // Close sidebar on mobile after selection
  };

  const gotoHome = () => {
    navigate('/');
    setShow(false);
  };

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
      {/* Mobile menu toggle button */}
      <div className='sm:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={() => setShow(!show)}
          className='p-2 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <CiMenuBurger className='text-2xl' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-screen shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 z-40
          ${show ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Mobile close icon */}
        <div className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer">
          <button onClick={() => setShow(false)} className='focus:outline-none'>
            <BiSolidLeftArrowAlt className='text-2xl' />
          </button>
        </div>

        {/* Profile section */}
        <div className='text-center mt-10'>
          <img
            src={profile?.photo?.url || "/default-avatar.png"}
            alt="Profile"
            className='w-24 h-24 rounded-full mx-auto mb-2 object-cover border-2 border-gray-300'
          />
          <p className='text-lg font-semibold'>{profile?.name || "Anonymous"}</p>
        </div>

        {/* Menu items */}
        <ul className='space-y-4 mt-8 px-4'>
          <button
            onClick={() => handleComponents("My Blogs")}
            className='w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300'
          >
            My Blogs
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300'
          >
            Create Blog
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className='w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition duration-300'
          >
            My Profile
          </button>
          <button
            onClick={gotoHome}
            className='w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300'
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className='w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300'
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
