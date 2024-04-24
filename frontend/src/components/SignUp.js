import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if (auth){
            console.log('hello')
            navigate('/')
        }
    })
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const handleSubmit = async ()=>{
        console.log(name, email, password)
            const result = await fetch('http://localhost:5000/register', {
            method:'post',
            body: JSON.stringify({name, email, password}),
            headers:{'Content-type': 'application/json'}
        })
        localStorage.setItem('user', JSON.stringify({name, email, password}))
        navigate('/')
    }
    return (
    <div className=" flex justify-center align-items-center">
        <div className='text-center'>
            <h1 className='m-4 text-2xl'>Register</h1>
            
            <input className='input-box' type = 'text' placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
            
            <input className='input-box' type = 'text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
            
            <input className='input-box' type = 'password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            
            <button className=' rounded-lg p-3 w-15 bg-blue-200 border-b-21' type='button' onClick={handleSubmit}>Sign Up</button>
        </div>
    </div>)
}
export default SignUp