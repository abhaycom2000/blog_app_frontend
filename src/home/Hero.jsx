import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';

function Hero() {
  const { blogs } = useAuth();

  return (
    <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6'>
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((item) => {
          return (
            <Link to={`/blog/${item._id}`} key={item._id} className='bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
              <div className='group relative'>
                <img src={item.blogImage?.url} alt="blog image"
                  className=' w-full h-56 object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300'></div>
                <h1 className='absolute  bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300'>{item.title}</h1>
              </div>
              <div className='p-6 flex items-center'>
                <img src={item?.adminImage} alt="adminimage"
                  className=' w-12 h-12 rounded-full border-2 border-s-yellow-400' />
                <div className='ml-4'>
                  <p className='text-lg font-semibold text-gray-800'>{item?.adminName}</p>
                  <p className='text-xs text-gray-400'>New</p>
                </div>
              </div>
            </Link>
          )
        })
      ) : (
        <div className='flex h-screen items-center justify-center'>
          Loading...
        </div>
      )}
    </div>
  )
}

export default Hero