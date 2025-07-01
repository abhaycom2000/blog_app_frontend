import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Creater() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get("http://localhost:4000/api/users/admins",
        // {withCredentials:true}
      )
      setAdmin(data)
    }
    fetchAdmins()
  }, [])
  return (
    <div className='container mx-auto p-4'>
      <h1 className=' text-2xl font-semibold mb-6'>Popular Creaters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
      {admin && admin.length > 0 ? (
        admin.slice(0, 4).map((item) => {
          return (
            <div key={item._id}>
                <div className=''>
                  <img src={item.photo?.url} alt="blog image"
                    className='md:w-56 md:h-56 object-cover border border-black rounded-full items-center'
                  />
                  <div className='text-center md:ml-[-130px]'>
                    <p>{item?.name}</p>
                    <p className='text-gray-600 text-xs'>{item?.role}</p>
                  </div>
                </div>
            </div>
          )
        })
      ) : ( <div className='flex h-screen items-center justify-center'>
          Loading...
        </div>)}
      </div>
    </div>
  )
}

export default Creater