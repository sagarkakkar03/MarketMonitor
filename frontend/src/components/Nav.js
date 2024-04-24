import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate() 
    const IMG_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlz_QeEKNapP1XrjMhFtDIkq4uvtg95x-90Q&s"
    const handleLogout = ()=>{
        localStorage.clear()
        console.log('testing logout')
        navigate('/signup')
    }
    let bool =false 
    if (auth) {
        bool = true
    }
    return <div>
       
        { bool ? 
        <ul >
            <li className=' absolute'>< img style= {{width:'46px', height:'46px', borderRadius:"40px"}} src = {IMG_URL} alt=""></img></li>
            <div className = "flex justify-center items-center space-x-4 text-lg bg-blue-200">
            <li className="px-4 py-2 hover:bg-gray-200"><Link to="/">Home</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200"><Link to="/add">Add Product</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200"><Link to="/profile">Profile</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200"><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </div>
        </ul>
        :
        <ul className = "flex justify-center items-center space-x-4 text-lg bg-blue-200">
           <li className="px-4 py-2 hover:bg-gray-200"><Link to="/login">Login</Link></li>
           <li className="px-4 py-2 hover:bg-gray-200"><Link to="/signup">Sign Up</Link></li>
        </ul>}
    </div>
}

export default Nav 