import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function MyBlogs() {
  const [myBlogs, setMyblogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/blogs/my-blogs", {
          withCredentials: true,
        });
        setMyblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete= async (id)=>{
     await axios.delete(`http://localhost:4000/api/blogs/delete/${id}`,{
      withCredentials:true
     }).then((res)=>{
      toast.success(res.data.message || "Blog delete successfully!");
      setMyblogs((value)=> value.filter((blog)=> blog._id !== id))
     }).catch((error)=>{
      toast.error(error.res.message || "Faild to delete blog")
     })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Blogs</h2>

      {myBlogs && myBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myBlogs.map((item) => (
            <Link
            to={`/blog/${item._id}`}
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {item.blogImage && (
                <img
                  src={item.blogImage?.url}
                  alt="blog"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-sm text-blue-600 uppercase">{item.category}</span>
                  <h3 className="text-lg font-semibold mt-1 text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/blog/update/${item._id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Update
                  </Link>
                  <button
                  onClick={()=>handleDelete(item._id)}
                    className="text-red-600 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>

          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">You have not posted any blog yet!</p>
      )}
    </div>
  );
}

export default MyBlogs;
