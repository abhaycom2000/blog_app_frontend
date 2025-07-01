import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Tranding() {
  const { blogs } = useAuth()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='container mx-auto'>
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs?.map((item) => {
            return (
              <div className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2" key={item._id}>
                <Link to={`/blog/${item._id}`} key={item._id} >
                  <div className=' relative'>
                    <img src={item.blogImage?.url} alt="blog image"
                      className=' w-full h-56 object-cover rounded-t-lg'
                    />
                    <div className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm'>{item.category}</div>
                  </div>

                  <div className="p-4 bg-gray-50 object-cover rounded-t-lg h-36 flex flex-col justify-between">
                    <h1 className="text-lg font-bold mb-2 overflow-hidden text-ellipsis" style={{ whiteSpace: 'nowrap' }}>{item.title}</h1>
                    <div className="flex items-center">
                      <img src={item?.adminImage} alt="admin image" className='w-10 h-10 rounded-full' />
                      <p className="ml-3 text-gray-400 text-sm">{item.adminName}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        ) : (<div className='flex h-screen items-center justify-center'>
          Loading...
        </div>)}
      </Carousel>
    </div>
  )
}

export default Tranding