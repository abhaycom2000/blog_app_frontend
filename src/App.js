import React from 'react'
import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home'
import Footer from '../src/components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Blogs from '../src/pages/Blogs'
import About from '../src/pages/About'
import Contact from './pages/Contact'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Dashboard from '../src/pages/Dashboard'
import Creaters from '../src/pages/Creaters'
import { useAuth } from './context/AuthProvider'

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/register", "/login"].includes(location.pathname)

  const {blogs} = useAuth()
  console.log(blogs);
  
  return (
    <div >
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/creaters' element={<Creaters />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
      {/* {!hideNavbarFooter && <Footer />} */}
    </div>
  )
}

export default App