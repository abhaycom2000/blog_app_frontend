import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams()
  const [blogDetail, setBlogDetails] = useState();


  useEffect(() => {
    const fecthSingleBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        setBlogDetails(data)
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
    }
    fecthSingleBlog()
  }, [id])
  return (
    <div>
      <div>
        {blogDetail && (
          <section className='container mx-auto p-4'>
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">{blogDetail?.category}</div>
            <h1 className="text-4xl font-bold mb-6">{blogDetail?.title}</h1>
            <div className="flex items-center mb-6">
              <img src={blogDetail?.adminImage?.url} alt="avtar" className='w-12 h-12 rounded-full mr-4' />
              <p className="text-lg font-semibold">{blogDetail?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blogDetail?.blogImage && (
                <img src={blogDetail?.blogImage} alt="avtar" className='md:w-1/2 w-full h-auto mb-6 rounded-lg shadow-lg cursor-pointer border' />
              )}

              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blogDetail?.about}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Details