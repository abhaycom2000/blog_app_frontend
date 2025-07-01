import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const AuthContext = createContext()
export default function AuthProvider({ children }) {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get("jwt")
                const parsedToken = token ? JSON.parse(token) : undefined
                // if (parsedToken) {
                    const { data } = await axios.get("http://localhost:4000/api/users/my-profile",
                        {
                            withCredentials: true,
                            headers: { 'Content-Type': "application/json" }
                        }
                    );
                    setProfile(data)
                    setIsAuthenticated(true)
                // }
            } catch (error) {
                console.log(error);
                toast.error(error)
            }
        }

        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/blogs/all-blogs");
                setBlogs(data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchBlogs()
        fetchProfile()
    }, [])
    return (
        <AuthContext.Provider value={{ blogs, profile,setProfile, isAuthenticated ,setIsAuthenticated}}>{children}</AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
