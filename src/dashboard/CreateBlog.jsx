import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function CreateBlog() {
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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    try {
      const { data } = await axios.post("http://localhost:4000/api/blogs/create",
        formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      );
      toast.success("Blog create successfully!");
      setTitle('')
      setAbout("");
      setCategory("")
      setBlogImage("")
      setBlogImagePreview("")
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  return (
    <div>
      <div className='min-h-screen p-10'>
        <div className='max-w-4xl mx-auto p-6 border rounded-lg shadow-lg'>
          <h3 className='text-2xl font-semibold mb-8'>Create Blog</h3>
          <form onSubmit={handleCreateBlog} className='space-y-6'>
            <div className=' space-y-2'>
              <label className="block text-lg">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 mb-4 outline-none rounded-md'>
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertenment">Entertenment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Blog title' value={title} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none' />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img src={blogImagePreview ? `${blogImagePreview}` : "Photo"} alt="photo" className='w-full max-w-sm h-auto object-cover rounded-md' />
              </div>
              <input type="file" onChange={changePhotoHandler} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none' />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea rows="5" onChange={(e) => setAbout(e.target.value)} placeholder='Write somthing about your blog' value={about} className='w-full p-2 border rounded-md' />
            </div>

            <button type='submit' className='w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 duration-200 rounded-md transition-colors text-white'>Create</button>
          </form>
        </div>
      </div >
    </div >
  )
}

export default CreateBlog