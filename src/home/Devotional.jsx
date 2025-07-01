import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs.filter((blog) => blog.category === "Devotional");

  return (

    <div>
      <div className='container mx-auto my-12 px-4'>
        <h1 className="text-3xl font-bold  mb-6">Devotional</h1>
        <p className="text-center text-gray-600 mb-8">
          The concept of gods varies widely across different cultures, religions, and belief systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt="blog"
                  className="w-full h-56 object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-30 "></div>

                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-sm">{blog.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No devotional blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;
