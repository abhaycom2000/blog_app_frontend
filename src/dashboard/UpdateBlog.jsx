import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [about, setAbout] = useState('')
  const [blogImage, setBlogImage] = useState('')
  const [blogImagePreview, setBlogImagePreview] = useState('')

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setBlogImagePreview(reader.result)
      setBlogImage(file)
    }
  }

  useEffect(() => {
    const fecthSingleBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/blogs/single-blog/${id}`,
          // formData, 
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        setTitle(data?.title)
        setAbout(data?.about);
        setCategory(data?.category)
        setBlogImage(data?.blogImage?.url)
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
    }
    fecthSingleBlog()
  }, [id])

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    try {
      const { data } = await axios.put(`http://localhost:4000/api/blogs/update/${id}`,
        formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      );
      toast.success("Blog update successfully!");
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
      <div className="container mx-auto my-12 p-4">
        <section className='max-w-2xl mx-auto'>
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className='block mb-2 font-semibold'>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-2 border rounded-md'>
                <option value="">Select Category</option>
                <option value="Devotional">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertenment">Entertenment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Blog title' value={title} className='w-full mb-4 p-2 border rounded-md' />

            <div className="mb-4">
              <label className='block mb-2 font-semibold'>Blog Image</label>
              <img src={blogImagePreview ? blogImagePreview : blogImage ? blogImage : "Photo"} alt="photo" className='w-full h-48 object-cover mb-4 rounded-md' />
              <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
            </div>
            <textarea rows="6" onChange={(e) => setAbout(e.target.value)} placeholder='Write somthing about your blog' value={about} className='w-full p-2 border rounded-md' />
            <button onClick={handleUpdateBlog} type='submit' className='w-full p-3  bg-blue-600 hover:bg-blue-700 rounded-md  text-white'>Update</button>

          </form>
        </section>
      </div>
    </div>
  )
}

export default UpdateBlog