import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddProduct = () =>{ 
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
     const [error, setError] =useState(false)

    const addProduct = async()=>{
        if(!name|| !price || !category|| !category){
            setError(true)
            return false
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({name, price, category, userId, company}),
            headers:{ 'Content-Type': 'application/json'}
        })
        
        result = await result.json()
        console.log(result)
        navigate('/')
    }

    return(
        <div className=" flex justify-center align-items-center">
        <div className='text-center'>
            <h1 className='m-auto text-2xl'> Add Product </h1>
                <input className='input-box' type = 'text' placeholder="Product name" value = {name} onChange={(e)=>setName(e.target.value)}></input>
                {error && !name && <span class=" text-red-500 my-0">Invalid name</span>}
                <input className='input-box' type = 'text' placeholder="Price" value = {price} onChange={(e)=>setPrice(e.target.value)}></input>
                {error && !price && <span class=" text-red-500 block">Invalid price</span>}
                <input className='input-box' type = 'text' placeholder="Category" value = {category} onChange={(e)=>setCategory(e.target.value)}></input>
                {error && !category && <span class=" text-red-500 block">Invalid category</span>}
                <input className='input-box' type = 'text' placeholder="Company" value = {company} onChange={(e)=>setCompany(e.target.value)}></input>
                {error && !company && <span class=" text-red-500 block">Invalid text</span>}
                <button className=' rounded-lg p-3 w-15 bg-blue-200 border-b-21' type='button' onClick={addProduct}>Add Product</button>
          
            </div>
        </div>
    )
}

export default AddProduct